// src/app/profile/page.tsx
"use client";

import { useState, useEffect } from "react";
import BlogCard from "@/components/modules/blog-card";
import { Blog } from "@/types/blog";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
} from "@/components/ui/pagination";

// 本番API連携が可能になるまでの仮データ（9件分）
// 本番では getBlogs() 関数の中で API or Supabase から取得する想定
const DUMMY_BLOGS: Blog[] = Array.from({ length: 9 }).map((_, i) => ({
  id: `${i + 1}`,
  title: `Post Title`,
  content: "ダミーの本文です",
  image_path: "/images/placeholder.jpg", // public/images/placeholder.jpg を参照
  created_at: new Date().toISOString(),
  user_id: "dummy-user-id",
  users: {
    id: "dummy-user-id",
    name: "Author",
    image_path: "/images/dummy-user.png", // public/images/dummy-user.png を参照
  },
  categories: {
    id: 1,
    name: "Category",
  },
  category_id: 1,
}));

const ITEMS_PER_PAGE = 6;

export default function ProfilePage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [blogs, setBlogs] = useState<Blog[]>([]); // ← 本番ではAPI取得データをここに格納

  // 🚧 本番API実装時はここを入れ替えるだけでOK！
  // 例: Supabase または fetch("/api/articles") を使用する想定
  useEffect(() => {
    const getBlogs = async () => {
      // 本番では以下のように書き換えてください
      // const res = await fetch("/api/articles");
      // const data = await res.json();
      // setBlogs(data);

      setBlogs(DUMMY_BLOGS); // ← 仮データ使用中
    };
    getBlogs();
  }, []);

  const totalPages = Math.ceil(blogs.length / ITEMS_PER_PAGE);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  // ページごとの表示データを抽出
  const paginatedBlogs = blogs.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <div className="max-w-6xl mx-auto mt-12 px-4">
      <h2 className="text-3xl font-bold text-center mb-10 text-[var(--color-foreground)]">
        Your Post
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {paginatedBlogs.map((blog) => (
          <BlogCard
            key={blog.id}
            post={{
              id: blog.id,
              title: blog.title,
              category: blog.categories.name,
              author: blog.users.name,
              createdAt: "a min ago", // ⏱ 本番では相対時刻に変換可
              image: blog.image_path,
            }}
          />
        ))}
      </div>

      {/* Pagination コンポーネント：ページ送り */}
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
              href="#"
              className="gap-1 px-2.5 sm:pl-2.5"
            >
              ← Previous Page
            </PaginationPrevious>
          </PaginationItem>
          {Array.from({ length: totalPages }).map((_, i) => (
            <PaginationItem key={i}>
              <PaginationLink
                href="#"
                isActive={currentPage === i + 1}
                onClick={() => handlePageChange(i + 1)}
              >
                {i + 1}
              </PaginationLink>
            </PaginationItem>
          ))}
          <PaginationItem>
            <PaginationNext
              onClick={() =>
                handlePageChange(Math.min(totalPages, currentPage + 1))
              }
              href="#"
              className="gap-1 px-2.5 sm:pr-2.5"
            >
              Next Page →
            </PaginationNext>
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}
