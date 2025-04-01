"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import CommentSection from "@/components/modules/comment-section";
import { Skeleton } from "@/components/ui/skeleton";
import { getBlogById } from "@/lib/api/blog";
import { Blog } from "@/types/blog";

export default function BlogDetailPage() {
  const params = useParams();
  const blogId = params.id as string | undefined;
  const [blog, setBlog] = useState<Blog | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        setIsLoading(true);
        if (!blogId) {
          setError("記事IDが指定されていません。");
          return;
        }
        const data = await getBlogById(blogId);
        if (data) {
          setBlog(data);
        } else {
          setError("記事が見つかりませんでした。");
        }
      } catch (err) {
        setError("記事の取得に失敗しました。");
        console.error("Error fetching blog:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBlog();
  }, [blogId]);

  if (!blogId) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-8">
        <p className="text-red-500">記事IDが指定されていません。</p>
        <Link href="/" className="text-[var(--color-accent-cyan)] mt-4 inline-block">
          ← 記事一覧に戻る
        </Link>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-8">
        <p className="text-red-500">{error}</p>
        <Link href="/" className="text-[var(--color-accent-cyan)] mt-4 inline-block">
          ← 記事一覧に戻る
        </Link>
      </div>
    );
  }

  if (isLoading) {
    return (
      <section className="max-w-3xl mx-auto px-4 py-8 space-y-6">
        <div className="flex items-center justify-between">
          <Skeleton className="h-10 w-3/4" />
          <div className="flex items-center space-x-3">
            <Skeleton className="h-10 w-10 rounded-full" />
          </div>
        </div>

        <Skeleton className="w-full h-72 rounded-md" />

        <div className="space-y-4">
          <Skeleton className="h-4 w-1/4" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-5/6" />
          <Skeleton className="h-4 w-4/6" />
        </div>
      </section>
    );
  }

  if (!blog) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-8">
        <p className="text-red-500">該当の記事は存在しません。</p>
        <Link href="/" className="text-[var(--color-accent-cyan)] mt-4 inline-block">
          ← 記事一覧に戻る
        </Link>
      </div>
    );
  }

  return (
    <section className="max-w-3xl mx-auto px-4 py-8 space-y-6">
      {/* 記事ヘッダー */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <div className="flex items-center space-x-2">
              <span className="px-2 py-1 bg-[var(--color-accent-blue)] text-white text-sm rounded">
                {blog.categories.name}
              </span>
              <span className="text-sm text-[var(--color-muted)]">
                {new Date(blog.created_at).toLocaleDateString()}
              </span>
            </div>
            <h1 className="text-3xl font-bold text-[var(--color-foreground)]">
              {blog.title}
            </h1>
          </div>
          <Link href="/" className="text-[var(--color-accent-cyan)]">
            ← 記事一覧
          </Link>
        </div>

        <div className="flex items-center space-x-3">
          <Image
            src={blog.users.image_path || '/images/user-icon-default.png'}
            alt={blog.users.name}
            width={40}
            height={40}
            className="rounded-full"
          />
          <span className="text-[var(--color-foreground)]">{blog.users.name}</span>
        </div>
      </div>

      {/* アイキャッチ画像 */}
      <div className="w-full h-72 bg-[var(--color-muted)] rounded-lg overflow-hidden">
        <Image
          src={blog.image_path || '/images/placeholder.jpg'}
          alt={blog.title}
          width={800}
          height={400}
          className="w-full h-full object-cover"
        />
      </div>

      {/* 記事本文 */}
      <article className="prose prose-invert max-w-none">
        <div className="whitespace-pre-wrap text-[var(--color-foreground)]">
          {blog.content}
        </div>
      </article>

      {/* コメントセクション */}
      <CommentSection blogId={blog.id} />
    </section>
  );
}
