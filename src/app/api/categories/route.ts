import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

/**
 * カテゴリ一覧を取得するAPI
 */
export async function GET() {
  // Supabaseクライアントの作成
  const supabase = createRouteHandlerClient({ cookies });

  // カテゴリを取得
  const { data, error } = await supabase
    .from('category')
    .select('id, name, created_at, updated_at')
    .order('created_at', { ascending: false });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ data });
}

/**
 * 新しいカテゴリを追加するAPI（認証が必要）
 */
export async function POST(req: NextRequest) {
  const { name } = await req.json();

  // バリデーション
  if (!name) {
    return NextResponse.json({ error: 'カテゴリ名が必要です' }, { status: 400 });
  }

  // Supabaseクライアントの作成
  const supabase = createRouteHandlerClient({ cookies });

  // ユーザー認証を取得
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: 'ログインしてください' }, { status: 401 });
  }

  // `created_at` と `updated_at` を日本時間（JST, UTC+9）で設定
  const now = new Date();
  const nowJST = new Date(now.getTime() + 9 * 60 * 60 * 1000).toISOString(); // UTC+9に変換

  // カテゴリを追加
  const { data, error } = await supabase
    .from('category')
    .insert({ name, created_at: nowJST, updated_at: nowJST })
    .select();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ data });
}

/**
 * 指定したカテゴリを削除するAPI（認証が必要）
 */
export async function DELETE(req: NextRequest) {
  const { id } = await req.json();

  // バリデーション
  if (!id) {
    return NextResponse.json({ error: 'カテゴリIDが必要です' }, { status: 400 });
  }

  // Supabaseクライアントの作成
  const supabase = createRouteHandlerClient({ cookies });

  // ユーザー認証を取得
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: 'ログインしてください' }, { status: 401 });
  }

  // カテゴリを削除
  const { error } = await supabase.from('category').delete().eq('id', id);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ message: 'カテゴリを削除しました' });
}
