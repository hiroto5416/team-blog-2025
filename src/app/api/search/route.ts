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
    const { searchParams } = new URL(req.url);
    const query = searchParams.get('query');

    if (!query) {
      return NextResponse.json({ error: '検索ワードが必要です' }, { status: 400 });
    }

    // 半角・全角の両方の検索ワードを取得
    const fullWidthQuery = query.replace(/[0-9]/g, (s) =>
      String.fromCharCode(s.charCodeAt(0) + 0xfee0),
    );
    const halfWidthQuery = query.replace(/[０-９]/g, (s) =>
      String.fromCharCode(s.charCodeAt(0) - 0xfee0),
    );

    // `ilike` で完全な部分一致検索を実現
    const { data, error } = await supabase
      .from('posts')
      .select(
        `id, title, content, created_at,
         users (id, name, image_path),
         categories (id, name)`,
      )
      .or(
        `title.ilike.%${halfWidthQuery}%,title.ilike.%${fullWidthQuery}%,content.ilike.%${halfWidthQuery}%,content.ilike.%${fullWidthQuery}%`,
      ) // どこかに含まれるデータを検索
      .order('created_at', { ascending: false });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json(data, { status: 200 });
  } catch {
    return NextResponse.json({ error: '内部サーバーエラー' }, { status: 500 });
  }
}
