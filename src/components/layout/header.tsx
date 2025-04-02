// src/components/layout/header.tsx
'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import Button from '@/components/ui/custom/button';
import { UserMenu } from '@/components/modules/user-menu';
import { supabase } from '@/lib/supabase';

export default function Header() {
  const [session, setSession] = useState<any>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  return (
    <header className="w-full border-b border-[var(--color-muted)] bg-[var(--color-card)] text-[var(--color-foreground)]">
      <nav className="flex w-full items-center justify-between px-4 py-4 sm:px-6">
        {/* 左側：ロゴ */}
        <Link
          href="/"
          className="text-2xl font-bold text-[var(--color-accent-blue)] transition hover:opacity-80"
        >
          BugDB
        </Link>

        {/* 右側：ログイン状態によって表示切替 */}
        <div className="flex items-center gap-4">
          {session ? (
            <>
              {/* Createボタン：モノトーン→ホバーでグリーン */}
              <Link href="/articlecreate">
                <Button className="border border-[var(--color-muted-foreground)] bg-transparent text-[var(--color-muted-foreground)] transition-colors hover:bg-[var(--color-accent-green)] hover:text-white">
                  Create
                </Button>
              </Link>

              {/* ユーザーメニュー */}
              <UserMenu
                userImage={session.user?.user_metadata?.avatar_url}
                userEmail={session.user?.email ?? ''}
              />
            </>
          ) : (
            <>
              <Link href="/auth/signin">
                <Button className="border border-[var(--color-accent-green)] bg-transparent text-[var(--color-accent-green)] hover:bg-[var(--color-accent-green)] hover:text-white">
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
