// components/layout/header.tsx
"use client";

import Link from "next/link";
import Image from "next/image";
import { useSession } from "next-auth/react";

export default function Header() {
  const { data: session } = useSession(); // 認証状態取得

  return (
    <header className="w-full bg-[var(--color-card)] text-[var(--color-foreground)] border-b border-[var(--color-muted)]">
      <nav className="w-full flex items-center justify-between px-6 py-4">
        {/* 左側：ロゴ */}
        <Link href="/" className="text-2xl font-bold text-[var(--color-accent-cyan)]">
          BugDB
        </Link>

        {/* 右側：認証状態による表示 */}
        <div className="flex items-center space-x-6">
          {session ? (
            <>
              {/* 記事作成リンク */}
              <Link
                href="/articlecreate"
                className="bg-[var(--color-accent-green)] text-white px-4 py-2 rounded-md hover:bg-[var(--color-accent-green-dark)] transition-colors"
              >
                Create
              </Link>

              {/* プロフィールアイコン */}
              <Link href="/profile">
                <Image
                  src={session.user?.image || "/images/dummy-user.png"}
                  alt="User Icon"
                  width={32}
                  height={32}
                  className="rounded-full hover:opacity-80 transition"
                />
              </Link>
            </>
          ) : (
            <>
              <Link
                href="/auth/signin"
                className="bg-[var(--color-accent-green)] text-white px-4 py-2 rounded-md hover:bg-[var(--color-accent-green-dark)] transition-colors"
              >
                Login
              </Link>
              <Link
                href="/auth/signup"
                className="bg-[var(--color-accent-blue)] text-white px-4 py-2 rounded-md hover:bg-[var(--color-accent-blue-dark)] transition-colors"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}
