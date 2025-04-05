// src/app/page.tsx
'use client';

import { useEffect, useState, useCallback } from 'react';
import { SearchInput } from '@/components/ui/custom/search-input';
import CustomPagination from '@/components/ui/custom/pagination';
import { getBlogs } from '@/lib/api/blog';
import { Blog } from '@/types/blog';
import Button from '@/components/ui/custom/button';
import BlogList from '@/components/modules/blog-list';

export const dynamic = "force-dynamic";

export default function HomePage() {
  const limit = 9;
  const [searchQuery, setSearchQuery] = useState('');
  const [searchInputValue, setSearchInputValue] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchBlogs = useCallback(async (searchQuery?: string, currentPage: number = 1) => {
    try {
      setIsLoading(true);
      setError(null);
      const allData = await getBlogs(searchQuery, currentPage, limit);
      setBlogs(allData.posts);
      setTotalPages(allData.totalPages);
    } catch (err) {
      console.error('記事取得エラー:', err);
      setError('Failed to fetch articles. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchBlogs(searchQuery, currentPage);
  }, [searchQuery, currentPage]);

  const executeSearch = () => {
    setSearchQuery(searchInputValue);
    setCurrentPage(1);
    fetchBlogs(searchInputValue);
  };

  const handleSearch = (query: string) => {
    setSearchInputValue(query);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  if (isLoading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <div className="h-12 w-12 animate-spin rounded-full border-t-2 border-b-2 border-primary" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-[400px] flex-col items-center justify-center">
        <p className="mb-4 text-destructive">{error}</p>
        <Button onClick={() => fetchBlogs()}>Retry</Button>
      </div>
    );
  }

  return (
    <main className="mx-auto max-w-6xl px-4 py-10">
      {/* Header */}
      <div className="mb-10 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <h1 className="text-3xl font-bold text-[var(--color-foreground)]">Blog Posts</h1>
        <Button
          onClick={() => {
            const isLoggedIn = false;
            window.location.href = isLoggedIn ? '/articlecreate' : '/login';
          }}
        >
          Create
        </Button>
      </div>

      {/* Search */}
      <div className="mb-10 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
        <SearchInput
          value={searchInputValue}
          onChange={handleSearch}
          onEnterPress={executeSearch}
          onSearch={executeSearch}
        />
        <Button onClick={executeSearch}>Search</Button>
      </div>

      {/* Blog List */}
      <BlogList blogs={blogs} />

      {/* Pagination */}
      <div className="mt-10 flex items-center justify-between">
        <CustomPagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>
    </main>
  );
}
