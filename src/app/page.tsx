//app/page.tsx
"use client";

import { useEffect, useState, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { SearchInput } from '@/components/ui/custom/search-input';
import CustomPagination from '@/components/ui/custom/pagination';
import { getBlogs } from '@/lib/api/blog';
import { Blog } from '@/types/blog';
import Button from '@/components/ui/custom/button';

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchInputValue, setSearchInputValue] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const totalPages = 10; // 仮の値 (実際はデータ件数から計算)

  const fetchBlogs = useCallback(async (searchQuery?: string) => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await getBlogs(searchQuery);
      setBlogs(data);
    } catch (err) {
      console.error('記事取得エラー:', err);
      setError('記事の取得に失敗しました。しばらく時間をおいて再度お試しください。');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchBlogs(searchQuery);
  }, [searchQuery, fetchBlogs]);

  // 検索実行
  const executeSearch = () => {
    setSearchQuery(searchInputValue);
    setCurrentPage(1); // 検索時は1ページ目に戻す
    fetchBlogs(searchInputValue);
  };

  // 検索入力のハンドラー
  const handleSearch = (query: string) => {
    setSearchInputValue(query);
  };

  // ページ変更ハンドラー
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  if (isLoading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <div className="h-12 w-12 animate-spin rounded-full border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-[400px] flex-col items-center justify-center">
        <p className="mb-4 text-red-500">エラー: {error}</p>
        <button
          onClick={() => fetchBlogs()}
          className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
        >
          再試行
        </button>
      </div>
    );
  }

  return (
    <main className="max-w-6xl mx-auto px-4 py-8">
      {/* ヘッダー部分 */}
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-3xl font-bold text-[var(--color-foreground)]">
          記事一覧
        </h1>
        <Button
          onClick={() => {
            // TODO: ログイン状態の確認とリダイレクト処理を実装
            const isLoggedIn = false; // 仮の実装。実際にはログイン状態を確認する
            if (isLoggedIn) {
              window.location.href = '/articlecreate'; // 記事作成ページへ
            } else {
              window.location.href = '/login'; // ログインページへ
            }
          }}
          className="bg-[rgb(0,255,76)] text-white hover:bg-transparent hover:text-white"
        >
          新規登録
        </Button>
      </div>

      {/* 検索バー */}
      <div className="mb-8 flex w-full items-center justify-center space-x-2">
        <SearchInput
          value={searchInputValue}
          onChange={handleSearch}
          onEnterPress={executeSearch}
          onSearch={executeSearch}
        />
        <Button
          onClick={executeSearch}
          className="h-11 bg-[rgb(0,255,76)] text-white hover:bg-transparent hover:text-white"
        >
          検索
        </Button>
      </div>

      {/* 記事一覧 */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
        {blogs.map((blog) => (
          <article
            key={blog.id}
            className="rounded-lg border border-[var(--color-muted)] bg-[var(--color-card)] p-4 shadow-sm transition hover:shadow-md"
          >
            <Link href={`/articledetail/${blog.id}`} className="block">
              <div className="flex h-60 w-full items-center justify-center rounded-md bg-[var(--color-muted)]">
                <Image
                  src={blog.image_path || '/images/placeholder.jpg'}
                  width={200}
                  height={150}
                  className="rounded-md object-cover"
                  alt="Blog Image"
                />
              </div>
            </Link>
            <div className="relative mt-4">
              {/* タイトルとカテゴリ */}
              <h2 className="text-lg font-semibold text-[var(--color-foreground)]">{blog.title}</h2>
              <span className="absolute top-0 right-0 text-sm text-[var(--color-accent-blue)]">
                {blog.category?.name || '未分類'}
              </span>

              {/* 著者と時間 */}
              <div className="mt-1 flex justify-start space-x-2 text-sm text-[var(--color-muted-foreground)]">
                <p>By {blog.users?.name || 'Unknown'}</p>
                <p>• {new Date(blog.created_at).toLocaleDateString()}</p>
              </div>

              {/* 記事の概要 */}
              <p className="mt-2 text-[var(--color-foreground)]">
                {blog.content?.substring(0, 100) || ''}...
              </p>

              {/* 記事へのリンク */}
              <Link
                href={`/articledetail/${blog.id}`}
                className="mt-2 inline-block text-[var(--color-accent-cyan)]"
              >
                記事を読む →
              </Link>
            </div>
          </article>
        ))}
      </div>

      {/* ページネーション */}
      <div className="mt-6 flex items-center justify-between">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="text-[var(--color-accent-cyan)] disabled:text-[var(--color-muted-foreground)]"
        >
          ← Previous Page
        </button>

        <CustomPagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />

        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="text-[var(--color-accent-cyan)] disabled:text-[var(--color-muted-foreground)]"
        >
          Next Page →
        </button>
      </div>
    </main>
  );
}