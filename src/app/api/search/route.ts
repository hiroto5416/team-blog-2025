import { supabase } from '@/lib/supabase';
import { NextRequest, NextResponse } from 'next/server';

/**
 * 記事タイトルから検索するエンドポイント
 *
 * @remarks
 * - クエリパラメータ `query` を受け取り、タイトルで全文検索を行う
 * - 検索対象は `posts` テーブルで、関連する `users` と `categories` の情報も取得
 * - 結果は作成日の降順で返される
 *
 * @param req - 検索ワードを含む `NextRequest` オブジェクト
 * @returns 検索結果のリスト（記事データと関連ユーザー・カテゴリ情報）
 *
 * @example
 * ```
 * GET /api/search?query=example
 * ```
 *
 * @response
 * ```
 * [
 *   {
 *     "id": 1,
 *     "title": "Example Post",
 *     "content": "This is an example content.",
 *     "created_at": "2024-03-19T12:00:00Z",
 *     "users": {
 *       "id": "user-123",
 *       "name": "John Doe",
 *       "image_path": "/avatars/john.jpg"
 *     },
 *     "categories": {
 *       "id": 2,
 *       "name": "Tech"
 *     }
 *   }
 * ]
 * ```
 *
 * @throws {Error} 検索ワードが提供されていない場合 (400)
 * @throws {Error} Supabaseの検索処理でエラーが発生した場合 (400)
 * @throws {Error} 内部サーバーエラー (500)
 */

export async function GET(req: NextRequest) {
  try {
    // クエリパラメータから検索ワードを取得
    const { searchParams } = new URL(req.url);
    const query = searchParams.get('query');

    if (!query) {
      return NextResponse.json({ error: '検索ワードが必要です' }, { status: 400 });
    }

    // Supabase の textSearch を使って検索
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
      .textSearch('title', query, { type: 'websearch' }) // タイトルで全文検索
      .order('created_at', { ascending: false });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json(data, { status: 200 });
  } catch {
    return NextResponse.json({ error: '内部サーバーエラー' }, { status: 500 });
  }
}
