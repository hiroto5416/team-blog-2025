"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabaseClient";
import { User } from "@supabase/supabase-js"; // Supabase の User 型をインポート

export default function Home() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
    };
    checkUser();
  }, []);

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gray-400">
      <h1 className="text-3xl font-bold mb-6">Welcome to Our Blog!!</h1>
      {/* 未ログイン → ログインボタンを表示.ログイン済み → ダッシュボードへのリンクを表示 */}
      {user ? (
        <Link href="/dashboard" className="px-4 py-2 bg-blue-500 text-white rounded">
          ダッシュボードへ
        </Link>
      ) : (
        <div className="flex space-x-4">
          <Link href="/auth/signin" className="px-4 py-2 bg-blue-500 text-white rounded">
            ログイン
          </Link>
          <Link href="/auth/signup" className="px-4 py-2 bg-green-500 text-white rounded">
            サインアップ
          </Link>
        </div>
      )}
    </main>
  );
}
