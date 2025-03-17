//app/page.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import SearchBar from "@/components/ui/custom/search-input"; // 検索バー
import BlogList from "@/components/modules/blog-list"; // 記事一覧
import CustomPagination from "@/components/ui/custom/pagination"; // ページネーション

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 10; // 仮の値 (実際はデータ件数から計算)

  // 記事データ（仮）
  const blogs = [
    { id: "1", title: "ブログ記事1", author: "著者1", category: "Tech", timeAgo: "5 min ago", content: "ブログ記事1の内容" },
    { id: "2", title: "ブログ記事2", author: "著者2", category: "Life", timeAgo: "10 min ago", content: "ブログ記事2の内容" },
    { id: "3", title: "ブログ記事3", author: "著者3", category: "Travel", timeAgo: "20 min ago", content: "ブログ記事3の内容" },
    { id: "4", title: "ブログ記事4", author: "著者4", category: "Tech", timeAgo: "30 min ago", content: "ブログ記事4の内容" },
    { id: "5", title: "ブログ記事5", author: "著者5", category: "Health", timeAgo: "45 min ago", content: "ブログ記事5の内容" },
    { id: "6", title: "ブログ記事6", author: "著者6", category: "Business", timeAgo: "1 hour ago", content: "ブログ記事6の内容" },
    { id: "7", title: "ブログ記事7", author: "著者7", category: "Education", timeAgo: "2 hours ago", content: "ブログ記事7の内容" },
    { id: "8", title: "ブログ記事8", author: "著者8", category: "Entertainment", timeAgo: "3 hours ago", content: "ブログ記事8の内容" },
    { id: "9", title: "ブログ記事9", author: "著者9", category: "Sports", timeAgo: "4 hours ago", content: "ブログ記事9の内容" },
  ];

  // 検索入力のハンドラー
  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setCurrentPage(1); // 検索時は1ページ目に戻す
  };

  // ページ変更ハンドラー
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <section className="space-y-6 max-w-6xl mx-auto px-4 py-8">
      {/* 検索バー */}
      <div className="flex justify-center">
        <SearchBar onSearch={handleSearch} />
      </div>

      {/* 記事一覧 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {blogs.map((blog) => (
          <article
            key={blog.id}
            className="border border-[var(--color-muted)] bg-[var(--color-card)] p-4 rounded-lg shadow-sm transition hover:shadow-md"
          >
            <Link href={`/articledetail/${blog.id}`} className="block">
              <div className="w-full h-60 bg-[var(--color-muted)] rounded-md flex justify-center items-center">
                <Image
                  src="/images/placeholder.jpg"
                  width={200}
                  height={150}
                  className="rounded-md object-cover"
                  alt="Blog Image"
                />
              </div>
            </Link>
            <div className="mt-4 relative">
              {/* タイトルとカテゴリ */}
              <h2 className="text-lg font-semibold text-[var(--color-foreground)]">
                {blog.title}
              </h2>
              <span className="absolute top-0 right-0 text-sm text-[var(--color-accent-blue)]">
                {blog.category}
              </span>

              {/* 著者と時間 */}
              <div className="flex justify-start space-x-2 text-sm text-[var(--color-muted-foreground)] mt-1">
                <p>By {blog.author}</p>
                <p>• {blog.timeAgo}</p>
              </div>

              {/* 記事の概要 */}
              <p className="mt-2 text-[var(--color-foreground)]">
                {blog.content.substring(0, 100)}...
              </p>

              {/* 記事へのリンク */}
              <Link href={`/articledetail/${blog.id}`} className="text-[var(--color-accent-cyan)] mt-2 inline-block">
                記事を読む →
              </Link>
            </div>
          </article>
        ))}
      </div>

      {/* ページネーション */}
      <div className="flex justify-between items-center mt-6">
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
    </section>
  );
}