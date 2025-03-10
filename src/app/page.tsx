// app/blog/page.tsx
"use client";

import { useState } from "react";
import SearchBar from "@/components/ui/custom/search-input"; // 検索バー
import BlogList from "@/components/modules/blog-list"; // 記事一覧

export default function BlogPage() {
  const [searchQuery, setSearchQuery] = useState("");

  // 検索入力のハンドラー
  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  return (
    <section className="space-y-6 max-w-5xl mx-auto px-4 py-8">
      {/* 検索バー */}
      <SearchBar onSearch={handleSearch} />

      {/* 記事一覧 */}
      <BlogList searchQuery={searchQuery} />
    </section>
  );
}
