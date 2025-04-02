import { Blog, BlogAllData } from '@/types/blog';

/**
 * 記事一覧の取得
 * @param searchQuery - 検索クエリ
 * @returns 記事一覧
 */
export async function getBlogs(
  searchQuery?: string,
  page?: number,
  limit?: number,
): Promise<BlogAllData> {
  try {
    const pageQuery = `page=${encodeURIComponent(page || '')}&limit=${encodeURIComponent(limit || '')}`;
    const url = searchQuery
      ? `/api/search?query=${encodeURIComponent(searchQuery)}&${pageQuery}`
      : `/api/articles?${pageQuery}`;

    const response = await fetch(url);
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || '記事の取得に失敗しました');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Blog fetch error:', error);
    throw error;
  }
}

/**
 * 新規記事の作成
 * @param formData - 記事データ
 * @returns 記事
 */
export async function createBlog(formData: FormData): Promise<Blog> {
  try {
    const response = await fetch('/api/articles', {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || '記事の作成に失敗しました');
    }

    return response.json();
  } catch (error) {
    console.error('Blog creation error:', error);
    throw error;
  }
}
