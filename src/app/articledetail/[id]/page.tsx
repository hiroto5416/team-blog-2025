// app/articledetail/[id]/page.tsx
"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import CommentSection from "@/components/modules/comment-section";

const dummyBlogs = [
  {
    id: "1",
    title: "Blog Title",
    author: "Admin",
    userImage: "/images/dummy-user.png", // ログイン中ユーザーのアイコン例
    content: "記事の本文…",
    image: "/images/placeholder.jpg", // アイキャッチ画像
  },
  // ...ほかのダミー記事
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
  const isLoggedIn = true; // ここを適切な認証ロジックに変更

  return (
    <section className="space-y-4 relative">
      <h2 className="text-2xl font-bold text-[var(--color-accent-cyan)]">{blog.title}</h2>

      {/* ユーザーアイコンを右上に配置 (absolute指定) */}
      <div className="absolute top-0 right-0 flex items-center space-x-2">
        <img
          src={blog.userImage || "/images/user-icon-default.png"}
          alt="User Icon"
          className="w-10 h-10 rounded-full"
        />

        {/* 編集ボタン (ログインユーザーのみ表示) */}
        {isLoggedIn && (
          <Link
            href={`/ArticleEdit/${blog.id}`}
            className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 transition"
          >
            編集
          </Link>
        )}
      </div>

      <p className="text-sm text-[var(--color-muted)]">By {blog.author}</p>

      {/* アイキャッチ画像 */}
      <img
        src={blog.image}
        alt={blog.title}
        className="w-full h-60 object-cover rounded-md"
      />

      <article className="text-[var(--color-foreground)]">{blog.content}</article>

      {/* コメント欄 */}
      <CommentSection />
    </section>
  );
}
