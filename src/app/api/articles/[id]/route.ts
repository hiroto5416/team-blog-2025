import { supabase } from '@/lib/supabase';
import { NextResponse, NextRequest } from 'next/server';

/**
 * 指定されたIDの記事を取得するエンドポイント
 *
 * @remarks
 * - 記事データを取得
 * - ユーザー情報とカテゴリー情報も合わせて取得
 * - 作成日時の降順でソート
 */
export async function GET(request: NextRequest) {
  try {
    // request.nextUrl.pathname からIDを取得
    const id = request.nextUrl.pathname.split('/').pop();

    if (!id) {
      return NextResponse.json({ error: 'IDが指定されていません' }, { status: 400 });
    }

    const { data, error } = await supabase
      .from('posts')
      .select(
        `
        *,
        users (
          id,
          name,
          image_path
        ),
        categories (
          id,
          name
        )
      `,
      )
      .eq('id', id)
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    if (!data) {
      return NextResponse.json({ error: '記事が見つかりません' }, { status: 404 });
    }

    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error('GET Error:', error);
    return NextResponse.json({ error: '内部サーバーエラー' }, { status: 500 });
  }
}

/**
 * 記事を更新するエンドポイント
 *
 * @remarks
 * - 記事の基本情報（タイトル、内容、カテゴリー、画像パス）を更新
 * - user_idは更新対象外（セキュリティ上の理由）
 * - 更新後の記事データを関連情報（ユーザー、カテゴリー）と共に返却
 *
 */
export async function PUT(request: NextRequest) {
  try {
    const id = request.nextUrl.pathname.split('/').pop();

    if (!id) {
      return NextResponse.json({ error: 'IDが指定されていません' }, { status: 400 });
    }

    const body = await request.json();

    const { data, error } = await supabase
      .from('posts')
      .update({
        title: body.title,
        content: body.content,
        category_id: body.category_id,
        image_path: body.image_path,
      })
      .eq('id', id)
      .select(
        `
        *,
        users (
          id,
          name,
          image_path
        ),
        categories (
          id,
          name
        )
      `,
      )
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    if (!data) {
      return NextResponse.json({ error: '記事が見つかりません' }, { status: 404 });
    }

    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error('PUT Error:', error);
    return NextResponse.json({ error: '内部サーバーエラー' }, { status: 500 });
  }
}

/**
 * 記事を削除するエンドポイント
 *
 * @remarks
 * - 指定されたIDの記事を削除
 * - 削除後のメッセージを返却
 *
 */
export async function DELETE(request: NextRequest) {
  try {
    const id = request.nextUrl.pathname.split('/').pop();

    if (!id) {
      return NextResponse.json({ error: 'IDが指定されていません' }, { status: 400 });
    }

    const { error } = await supabase.from('posts').delete().eq('id', id);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json({ message: '記事が正常に削除されました' }, { status: 200 });
  } catch (error) {
    console.error('DELETE Error:', error);
    return NextResponse.json({ error: '内部サーバーエラー' }, { status: 500 });
  }
}
