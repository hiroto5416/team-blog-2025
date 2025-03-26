import { supabase } from '@/lib/supabase';
import { NextResponse } from 'next/server';

/**
 * 記事を新規作成するエンドポイント
 *
 * @remarks
 * - 画像ファイルがある場合は、Supabase Storageにアップロードし、URLを記事データに保存
 * - 記事データはSupabaseのpostsテーブルに保存
 * - 画像ファイルは'images'バケットに保存され、posts/ディレクトリに配置
 *
 * @param request - FormDataを含むリクエストオブジェクト
 * @returns 作成された記事データ
 *
 * @example
 * ```
 * // FormDataの例
 * {
 *   title: "記事タイトル",
 *   content: "記事本文",
 *   user_id: "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
 *   category_id: "1",
 *   image: File
 * }
 * ```
 *
 * @throws {Error} 画像アップロードに失敗した場合
 * @throws {Error} 記事データの保存に失敗した場合
 */
export async function POST(request: Request) {
  try {
    // FormDataから各フィールドを取得
    const formData = await request.formData();
    const title = formData.get('title') as string;
    const content = formData.get('content') as string;
    const user_id = formData.get('user_id') as string;
    const category_id = formData.get('category_id') as string;
    const image = formData.get('image') as File;

    // 画像のアップロード処理
    let image_path = null;
    if (image) {
      // ユニークなファイル名を生成
      const fileExt = image.name.split('.').pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `posts/${fileName}`;

      // Supabase Storageに画像をアップロード
      const { error: uploadError } = await supabase.storage.from('images').upload(filePath, image);

      if (uploadError) {
        return NextResponse.json({ error: '画像のアップロードに失敗しました' }, { status: 400 });
      }

      // アップロードした画像の公開URLを取得
      const {
        data: { publicUrl },
      } = supabase.storage.from('images').getPublicUrl(filePath);

      image_path = publicUrl;
    }

    // 記事データをpostsテーブルに保存
    const { data, error } = await supabase
      .from('posts')
      .insert([
        {
          title,
          content,
          user_id,
          category_id,
          image_path,
        },
      ])
      .select();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    // 作成された記事データを返却
    return NextResponse.json(data[0], { status: 201 });
  } catch {
    return NextResponse.json({ error: '内部サーバーエラー' }, { status: 500 });
  }
}

/**
 * 記事一覧を取得するエンドポイント
 *
 * @remarks
 * - 記事データを取得（全件またはページネーションあり）
 * - ユーザー情報とカテゴリー情報も合わせて取得
 * - 作成日時の降順でソート
 *
 * @param request - リクエストオブジェクト
 *   - `page`: ページ番号（省略時は全件取得）
 *   - `limit`: 1ページあたりの記事数（省略時は全件取得）
 *
 * @returns 記事一覧データ（ページネーション情報を含む場合あり）
 *
 * @example
 * ```json
 * // 全件取得時のレスポンス例
 * [
 *   {
 *     "id": 1,
 *     "title": "記事タイトル",
 *     "content": "記事本文",
 *     "image_path": "https://...",
 *     "created_at": "2024-02-20T...",
 *     "users": {
 *       "id": "xxx",
 *       "name": "ユーザー名"
 *     },
 *     "categories": {
 *       "id": 1,
 *       "name": "カテゴリー名"
 *     }
 *   },
 *   ...
 * ]
 *
 * // ページネーション適用時のレスポンス例
 * {
 *   "posts": [
 *     {
 *       "id": 1,
 *       "title": "記事タイトル",
 *       "content": "記事本文",
 *       "image_path": "https://...",
 *       "created_at": "2024-02-20T...",
 *       "users": {
 *         "id": "xxx",
 *         "name": "ユーザー名"
 *       },
 *       "categories": {
 *         "id": 1,
 *         "name": "カテゴリー名"
 *       }
 *     },
 *     ...
 *   ],
 *   "total": 100,
 *   "totalPages": 10,
 *   "currentPage": 1
 * }
 * ```
 */

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const page = searchParams.has('page') ? Number(searchParams.get('page')) : null;
    const limit = searchParams.has('limit') ? Number(searchParams.get('limit')) : null;

    // パラメータによる範囲記事取得
    if (page !== null && limit !== null) {
      const start = (page - 1) * limit;
      const end = start + limit - 1;
      const { data, error, count } = await supabase
        .from('posts')
        .select(
          `*,
          users ( id, name, image_path ),
          categories ( id, name )`,
          { count: 'exact' },
        )
        .order('created_at', { ascending: false })
        .range(start, end);

      if (error) {
        return NextResponse.json({ error: error.message }, { status: 400 });
      }

      return NextResponse.json(
        {
          posts: data,
          total: count,
          totalPages: count !== null ? Math.ceil(count / limit) : 0,
          currentPage: page,
        },
        { status: 200 },
      );
    }

    // 全記事取得
    const { data, error } = await supabase
      .from('posts')
      .select(
        `*,
        users ( id, name, image_path ),
        categories ( id, name )`,
      )
      .order('created_at', { ascending: false });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json(data, { status: 200 });
  } catch {
    return NextResponse.json({ error: '内部サーバーエラー' }, { status: 500 });
  }
}
