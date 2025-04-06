import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { SupabaseComment, Comment } from '@/types/comment';

/**
 * Supabaseのコメント形式をフロントエンドの形式に変換
 */
function formatComment(comment: SupabaseComment): Comment {
  return {
    id: comment.id,
    content: comment.content,
    created_at: comment.created_at,
    user: {
      name: comment.users.name,
      image_path: comment.users.image_path,
    },
  };
}

/**
 * コメントを作成するAPI
 * @param request リクエスト
 * @returns レスポンス
 */
export async function POST(request: Request) {
  try {
    const { postId, content } = await request.json();

    if (!postId || !content) {
      return NextResponse.json({ error: 'postIdとcontentが必要です' }, { status: 400 });
    }

    const supabase = createRouteHandlerClient({ cookies });
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: 'ログインしてください' }, { status: 401 });
    }

    const { data: post, error: postError } = await supabase
      .from('posts')
      .select('id')
      .eq('id', postId)
      .single();

    if (postError || !post) {
      return NextResponse.json({ error: '指定された投稿が存在しません' }, { status: 404 });
    }

    const { data, error } = await supabase
      .from('comments')
      .insert({
        user_id: user.id,
        post_id: postId,
        content: content,
      })
      .select(
        `
        id,
        content,
        created_at,
        users (
          name,
          image_path
        )
      `,
      )
      .returns<SupabaseComment[]>();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    const formattedData = formatComment(data[0]);
    return NextResponse.json({ data: formattedData });
  } catch (error) {
    console.error('Error in POST /api/comments:', error);
    return NextResponse.json({ error: 'サーバーエラーメッセージ' }, { status: 500 });
  }
}

/**
 * 指定された投稿IDに関連するコメントを取得するAPI
 * @param request リクエスト
 * @returns レスポンス
 */
export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const postId = url.searchParams.get('postId');

    if (!postId) {
      return NextResponse.json({ error: 'postIdが必要です' }, { status: 400 });
    }

    const supabase = createRouteHandlerClient({ cookies });
    const { data, error } = await supabase
      .from('comments')
      .select(
        `
        id,
        content,
        created_at,
        users (
          name,
          image_path
        )
      `,
      )
      .eq('post_id', postId)
      .order('created_at', { ascending: false })
      .returns<SupabaseComment[]>();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    const formattedData = data.map(formatComment);
    return NextResponse.json({ data: formattedData });
  } catch (error) {
    console.error('Error in GET /api/comments:', error);
    return NextResponse.json({ error: 'サーバーエラーメッセージ' }, { status: 500 });
  }
}
