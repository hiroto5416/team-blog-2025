// src/app/profile/page.tsx
"use client";

import { useEffect, useState } from "react";
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
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Post } from "@/types/blog-card"; // ✅ 共通Post型を利用

const ITEMS_PER_PAGE = 9;

export default function ProfilePage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const getUserBlogs = async () => {
      const supabase = createClientComponentClient();
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        console.error("ログインユーザーが取得できません");
        return;
      }

      const res = await fetch("/api/articles");
      const data = await res.json();

      if (!res.ok) {
        console.error("記事の取得に失敗しました", data.error);
        return;
      }

      const allPosts: Blog[] = Array.isArray(data.posts) ? data.posts : data;
      const userPosts = allPosts.filter((post) => post.user_id === user.id);

      setTotalPages(Math.ceil(userPosts.length / ITEMS_PER_PAGE));
      setBlogs(userPosts);
    };

    getUserBlogs();
  }, []);

  const paginatedBlogs = blogs.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="max-w-6xl mx-auto mt-12 px-4">
      <h2 className="text-3xl font-bold text-center mb-10 text-[var(--color-foreground)]">
        Your Posts
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {paginatedBlogs.map((blog) => {
          const blogCardPost: Post = {
            id: blog.id,
            title: blog.title,
            category: blog.category?.name ?? "カテゴリーなし",
            author: blog.users?.name ?? "不明",
            createdAt: new Date(blog.created_at).toLocaleDateString(),
            image: blog.image_path ?? "/images/placeholder.jpg",
            description: blog.content?.substring(0, 100) ?? "",
          };

          return <BlogCard key={blog.id} post={blogCardPost} />;
        })}
      </div>

      {totalPages > 1 && (
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                href="#"
              >
                ← Previous
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
              >
                Next →
              </PaginationNext>
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
    </div>
  );
}
