import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

/**
 * コメントを作成するAPI
 * @param request リクエスト
 * @returns レスポンス
 */
export async function POST(request: Request) {
  // リクエストからJSONデータを取得
  const { postId, content } = await request.json();

  // バリデーション
  if (!postId || !content) {
    return NextResponse.json({ error: 'postIdとcontentが必要です' }, { status: 400 });
  }

  // Supabaseクライアントの作成
  const supabase = createRouteHandlerClient({ cookies });

  // 現在ログインしているユーザーの取得
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: 'ログインしてください' }, { status: 401 });
  }

  // 投稿が実際に存在するか確認
  const { data: post, error: postError } = await supabase
    .from('posts')
    .select('id')
    .eq('id', postId)
    .single();

  if (postError || !post) {
    return NextResponse.json({ error: '指定された投稿が存在しません' }, { status: 404 });
  }

  // コメントをデータベースに挿入
  const { data, error } = await supabase
    .from('comments')
    .insert({
      user_id: user.id,
      post_id: postId,
      content: content,
    })
    .select();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ data });
}

/**
 * 指定された投稿IDに関連するコメントを取得するAPI
 * @param request リクエスト
 * @returns レスポンス
 */
export async function GET(request: Request) {
  // URLからクエリパラメータを取得
  const url = new URL(request.url);
  const postId = url.searchParams.get('postId');

  // バリデーション
  if (!postId) {
    return NextResponse.json({ error: 'postIdが必要です' }, { status: 400 });
  }

  // Supabaseクライアントの作成
  const supabase = createRouteHandlerClient({ cookies });

  // 指定された投稿IDに関連するコメントを取得
  const { data, error } = await supabase
    .from('comments')
    .select('*, users(name, image_path)') // ユーザー名と画像パスを取得
    .eq('post_id', postId)
    .order('created_at', { ascending: false }); // 新しい順から取得

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ data });
}
