// components/layout/Header.tsx
"use client";

import Link from 'next/link';

export default function Header() {
  return (
    <header className="w-full bg-card text-foreground border-b border-muted">
      <nav className="w-full flex items-center justify-between px-6 py-4">
        {/* 中央: ロゴ */}
        <Link href="/" className="text-2xl font-bold text-accent-cyan mx-4">
          BugDB
        </Link>

        {/* 右側: ログイン/サインアップボタン */}
        <div className="flex items-center space-x-4">
          <Link
            href="/auth/signin"
            className="bg-accent-green text-white px-4 py-2 rounded-md hover:bg-accent-green-dark transition-colors"
          >
            ログイン
          </Link>
          <Link
            href="/auth/signup"
            className="bg-accent-blue text-white px-4 py-2 rounded-md hover:bg-accent-blue-dark transition-colors"
          >
            サインアップ
          </Link>
        </div>
      </nav>
    </header>
  );
}