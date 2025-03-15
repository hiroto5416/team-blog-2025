// app/page.tsx
"use client";

import { useState } from "react";
import SearchBar from "@/components/ui/custom/search-input"; // 検索バー
import BlogList from "@/components/modules/blog-list"; // 記事一覧

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState("");

  // 検索入力のハンドラー
  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  return (
    <section className="space-y-6">
      {/* 検索バー */}
      <SearchBar onSearch={handleSearch} />

      {/* 記事一覧（検索クエリを渡してフィルタリングなどを行う想定） */}
      <BlogList searchQuery={searchQuery} />

      {/* 必要に応じてページネーションなどを配置してもOK */}
    </section>
  );
}
