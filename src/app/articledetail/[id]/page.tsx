"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import CommentSection from "@/components/modules/comment-section";

const dummyBlogs = [
  {
    id: "1",
    title: "Blog Title",
    author: "Admin",
    userImage: "/images/dummy-user.png",
    content: "この記事はサンプル記事です。本番環境では、適切なデータを取得してください。",
    image: "/images/placeholder.jpg",
  },
];

export default function BlogDetailPage() {
  const params = useParams();
  const blogId = params.id as string | undefined;

  if (!blogId) {
    return <p className="text-red-500">記事が見つかりません。</p>;
  }

  const blog = dummyBlogs.find((b) => b.id === blogId);
  if (!blog) {
    return <p className="text-red-500">該当の記事は存在しません。</p>;
  }

  // 仮のログイン状態（本番環境では認証状態を取得する）
  const isLoggedIn = true;

  return (
    <section className="max-w-3xl mx-auto px-4 py-8 space-y-6">
      {/* 記事タイトル & ユーザー情報 & 編集ボタン */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-[var(--color-foreground)]">{blog.title}</h1>
        <div className="flex items-center space-x-3">
          <Image
            src={blog.userImage}
            alt="User Icon"
            width={40}
            height={40}
            className="rounded-full shadow-md"
          />
          {/* 編集ボタン（ログイン中のみ表示） */}
          {isLoggedIn && (
            <Link
              href={`/articleedit/${blog.id}`}
              className="rounded bg-[var(--color-accent-cyan)] px-4 py-2 text-white hover:bg-[var(--color-accent-cyan-dark)] transition"
            >
              編集
            </Link>
          )}
        </div>
      </div>

      {/* アイキャッチ画像 */}
      <div className="w-full h-72 bg-[var(--color-muted)] rounded-md flex justify-center items-center">
        <Image
          src={blog.image}
          width={800}
          height={400}
          className="rounded-md object-cover w-full h-full"
          alt="Blog Image"
        />
      </div>

      {/* 記事内容 */}
      <article className="text-lg text-[var(--color-foreground)] leading-relaxed">
        {blog.content}
      </article>

      {/* コメント欄 */}
      <CommentSection />
    </section>
  );
}
