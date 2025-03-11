import { supabase } from '@/lib/supabase';
import { NextResponse } from 'next/server';

/**
 * 指定されたIDの記事を取得するエンドポイント
 *
 * @param request - リクエストオブジェクト
 * @param params - URLパラメータ（記事ID）
 * @returns 記事データ
 *
 * @throws {Error} 記事が見つからない場合
 */
export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
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
      .eq('id', params.id)
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    if (!data) {
      return NextResponse.json({ error: '記事が見つかりません' }, { status: 404 });
    }

    return NextResponse.json(data, { status: 200 });
  } catch {
    return NextResponse.json({ error: '内部サーバーエラー' }, { status: 500 });
  }
}

/**
 * 指定されたIDの記事を更新するエンドポイント
 *
 * @remarks
 * - 記事の基本情報（タイトル、内容、カテゴリー、画像パス）を更新
 * - user_idは更新対象外（セキュリティ上の理由）
 * - 更新後の記事データを関連情報（ユーザー、カテゴリー）と共に返却
 *
 * @param request - 更新データを含むリクエストオブジェクト
 * @param params - URLパラメータ（記事ID）
 * @returns 更新された記事データ
 *
 * @example
 * ```
 * // リクエストボディの例
 * {
 *   title: "更新後のタイトル",
 *   content: "更新後の本文",
 *   category_id: 2,
 *   image_path: "/images/updated.jpg"
 * }
 * ```
 *
 * @throws {Error} 記事が見つからない場合
 * @throws {Error} 更新処理に失敗した場合
 */
export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    // リクエストボディから更新データを取得
    const body = await request.json();

    // 記事データを更新し、更新後のデータを取得
    const { data, error } = await supabase
      .from('posts')
      .update({
        title: body.title,
        content: body.content,
        category_id: body.category_id,
        image_path: body.image_path,
      })
      .eq('id', params.id)
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
  } catch {
    return NextResponse.json({ error: '内部サーバーエラー' }, { status: 500 });
  }
}

/**
 * 指定されたIDの記事を削除するエンドポイント
 *
 * @param request - リクエストオブジェクト
 * @param params - URLパラメータ（記事ID）
 * @returns 削除成功メッセージ
 */
export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    const { error } = await supabase.from('posts').delete().eq('id', params.id);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json({ message: '記事が正常に削除されました' }, { status: 200 });
  } catch {
    return NextResponse.json({ error: '内部サーバーエラー' }, { status: 500 });
  }
}
