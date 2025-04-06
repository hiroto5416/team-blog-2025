// src/components/layout/header.tsx
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import type { Session, User } from "@supabase/auth-helpers-nextjs";
import Button from "@/components/ui/custom/button";
import { UserMenu } from "@/components/modules/user-menu";

type ExtendedUser = User & {
  user_metadata?: {
    image?: string;
  };
};

export default function Header() {
  const [session, setSession] = useState<Session | null | undefined>(undefined); // ← undefined 初期化でHydration対策
  const router = useRouter();
  const supabase = createClientComponentClient();

  useEffect(() => {
    const getSession = async () => {
      const { data } = await supabase.auth.getSession();
      setSession(data.session);
    };

    getSession();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, newSession) => {
      setSession(newSession);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [supabase]);

  const handleLogout = async () => {
    await fetch("/api/auth/signout", { method: "POST" });
    setSession(null);
    router.push("/");
  };

  // ✅ サーバーとの不一致を防ぐため、セッションが確定するまで描画しない
  if (session === undefined) return null;

  const userWithMeta = session?.user as ExtendedUser | undefined;
  const userImage = userWithMeta?.user_metadata?.image;

  return (
    <header className="w-full border-b border-[var(--color-muted)] bg-[var(--color-card)] text-[var(--color-foreground)]">
      <nav className="flex w-full items-center justify-between px-4 sm:px-6 py-4">
        <Link
          href="/"
          className="text-2xl font-bold text-[var(--color-accent-blue)] hover:opacity-80 transition"
        >
          BugDB
        </Link>
        <div className="flex items-center gap-4">
          {session ? (
            <>
              <Link href="/articlecreate">
                <Button className="bg-[rgb(0,255,76)] text-black  hover:bg-transparent hover:text-white">
                  Create
                </Button>
              </Link>
              <UserMenu
                userImage={userImage}
                userEmail={session.user.email ?? ""}
                onLogout={handleLogout}
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
