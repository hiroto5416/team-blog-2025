// app/blog/page.tsx
"use client";

import { useState } from "react";
import SearchBar from "@/components/ui/custom/search-input"; // 検索バー追加
import BlogList from "@/components/modules/blog-list"; // 記事一覧コンポーネント

export default function BlogPage() {
  const [searchQuery, setSearchQuery] = useState("");

  // 検索バーの入力変更ハンドラー
  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  return (
    <section className="space-y-6">
      {/* 検索バー */}
      <SearchBar onSearch={handleSearch} />

      {/* 記事一覧 */}
      <BlogList searchQuery={searchQuery} />
    </section>
  );
}
