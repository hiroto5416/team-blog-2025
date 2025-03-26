import { Blog } from '@/types/blog';

/**
 * 記事一覧の取得
 * @param searchQuery - 検索クエリ
 * @returns 記事一覧
 */
export async function getBlogs(searchQuery?: string): Promise<Blog[]> {
  const url = searchQuery
    ? `/api/search?query=${encodeURIComponent(searchQuery)}`
    : '/api/articles';

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('記事の取得に失敗しました');
  }

  return response.json();
}

/**
 * 新規記事の作成
 * @param formData - 記事データ
 * @returns 記事
 */
export async function createBlog(formData: FormData): Promise<Blog> {
  const response = await fetch('/api/articles', {
    method: 'POST',
    body: formData,
  });
  if (!response.ok) {
    throw new Error('記事の作成に失敗しました');
  }
  return response.json();
}
