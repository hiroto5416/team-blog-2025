// src/components/layout/header.tsx
"use client";

import Link from "next/link";
import { useSession } from "next-auth/react"; // ✅ 本番用に戻した
import Button from "@/components/ui/custom/button";
import { UserMenu } from "@/components/modules/user-menu";

export default function Header() {
  const { data: session } = useSession(); // ✅ 実際のセッション取得

  return (
    <header className="w-full border-b border-[var(--color-muted)] bg-[var(--color-card)] text-[var(--color-foreground)]">
      <nav className="flex w-full items-center justify-between px-4 sm:px-6 py-4">
        {/* 左側：ロゴ */}
        <Link
          href="/"
          className="text-2xl font-bold text-[var(--color-accent-blue)] hover:opacity-80 transition"
        >
          BugDB
        </Link>

        {/* 右側：ログイン状態によって表示切替 */}
        <div className="flex items-center gap-4">
          {session ? (
            <>
              {/* Createボタン：モノトーン→ホバーでグリーン */}
              <Link href="/articlecreate">
                <Button className="border border-[var(--color-muted-foreground)] bg-transparent text-[var(--color-muted-foreground)] hover:bg-[var(--color-accent-green)] hover:text-white transition-colors">
                  Create
                </Button>
              </Link>

              {/* ユーザーメニュー */}
              <UserMenu
                userImage={session.user?.image}
                userEmail={session.user?.email ?? ""}
              />
            </>
          ) : (
            <>
              <Link href="/auth/signin">
                <Button className="bg-transparent border border-[var(--color-accent-green)] text-[var(--color-accent-green)] hover:bg-[var(--color-accent-green)] hover:text-white">
                  Login
                </Button>
              </Link>
              <Link href="/auth/signup">
                <Button className="bg-[var(--color-accent-blue)] text-white hover:bg-[var(--color-accent-blue-dark)]">
                  Sign Up
                </Button>
              </Link>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}
