// app/mypage/page.tsx
"use client";

import { useState, useEffect } from "react";
import Card from "@/components/ui/custom/card";
import Input from "@/components/ui/custom/input";
import Button from "@/components/ui/custom/button";
import BlogCard from "@/components/modules/blog-card"; // <-- ここがポイント

interface UserInfo {
  name: string;
  email: string;
}

const dummyUser: UserInfo = {
  name: "ゲスト",
  email: "guest@example.com",
};

// ダミー投稿
const dummyUserPosts = [
  {
    id: "101",
    title: "ユーザ記事1",
    category: "雑記",
    author: "ゲスト",
    createdAt: "1 day ago",
    image: "/images/placeholder.jpg",
  },
  {
    id: "102",
    title: "ユーザ記事2",
    category: "プログラミング",
    author: "ゲスト",
    createdAt: "2 days ago",
    image: "/images/placeholder.jpg",
  },
];

export default function MyPage() {
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);

  useEffect(() => {
    // ダミーユーザー情報をセット
    setUserInfo(dummyUser);
  }, []);

  if (!userInfo) {
    return (
      <p className="text-center text-[var(--color-muted)] mt-8">読み込み中...</p>
    );
  }

  return (
    <main className="max-w-5xl mx-auto px-4 py-8 space-y-8">
      {/* ユーザ情報 */}
      <Card className="p-4">
        <h2 className="text-2xl font-bold text-[var(--color-accent-cyan)]">
          マイページ
        </h2>
        <p className="text-[var(--color-muted)] text-sm mb-4">
          ログイン機能が未実装のため、ゲストデータを表示中
        </p>

        <div className="space-y-2">
          <div>
            <label className="text-sm text-[var(--color-muted)]">名前</label>
            <Input
              type="text"
              value={userInfo.name}
              disabled
              className="w-full mt-1"
            />
          </div>
          <div>
            <label className="text-sm text-[var(--color-muted)]">メールアドレス</label>
            <Input
              type="email"
              value={userInfo.email}
              disabled
              className="w-full mt-1"
            />
          </div>
          <Button className="w-full mt-2">設定を変更（未実装）</Button>
        </div>
      </Card>

      {/* 投稿一覧 (Your Posts) */}
      <section>
        <h3 className="text-xl font-bold text-[var(--color-accent-cyan)] mb-4">
          Your Posts
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {dummyUserPosts.map((post) => (
            <BlogCard
              key={post.id}
              post={post}
              // customLink を指定 → 編集ページに遷移
              customLink={`/blog/edit/${post.id}`}
            />
          ))}
        </div>
      </section>
    </main>
  );
}
