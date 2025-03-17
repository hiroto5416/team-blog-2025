// components/layout/Header/Header.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

/**
 * ログイン状態などは本来コンテキストやサーバーサイドから取得しますが、
 * ここではダミーで isLoggedIn を管理しています。
 */
export default function Header() {
  const isLoggedIn = false; // ダミー
  const userImage = "/images/dummy-user.png"; // ダミー

  // 現在のパスを取得して、必要ならハイライトなどで利用
  const pathname = usePathname();

  return (
    <header className="w-full bg-[var(--color-card)] text-[var(--color-foreground)] border-b border-[var(--color-muted)]">
      <nav className="w-full flex items-center justify-between px-6 py-4">
        {/* ロゴやホームに戻るリンク */}
        <Link
          href="/"
          className="text-2xl font-bold text-[var(--color-accent-cyan)]"
        >
          Team Blog
        </Link>

        <div className="flex items-center space-x-6">
          {/* 記事作成へのリンク */}
          <Link
            href="/articlecreate"
            className="hover:text-[var(--color-accent-green)] transition-colors"
          >
            Create
          </Link>

          {/* ログイン状態に応じて表示を切り替え */}
          {isLoggedIn ? (
            <Link href="/mypage">
              <img
                src={userImage}
                alt="User Icon"
                className="w-8 h-8 rounded-full hover:opacity-80 transition"
              />
            </Link>
          ) : (
            <Link
              href="/auth/signin"
              className="hover:text-[var(--color-accent-green)] transition-colors"
            >
              ログイン
            </Link>
          )}
        </div>
      </nav>
    </header>
  );
}
