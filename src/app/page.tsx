//app/page.tsx
"use client";

import { useState } from "react";
import SearchBar from "@/components/ui/custom/search-input"; // 検索バー
import BlogList from "@/components/modules/blog-list"; // 記事一覧
import CustomPagination from "@/components/ui/custom/pagination"; // ページネーション

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 5; // 仮の値 (実際はデータ件数から計算)

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
    <section className="space-y-6">
      {/* 検索バー */}
      <SearchBar onSearch={handleSearch} />

      {/* 記事一覧（検索クエリを渡してフィルタリング） */}
      <BlogList searchQuery={searchQuery} currentPage={currentPage} />

      {/* ページネーション */}
      <div className="flex justify-center mt-6">
        <CustomPagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>
    </section>
  );
}
