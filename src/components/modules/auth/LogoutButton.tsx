// BEが仮で作成
"use client";

import { useRouter } from "next/navigation";
import { supabase } from "../../../lib/supabaseClient"; // Supabase クライアントをインポート

const LogoutButton = () => {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut(); // Supabase でログアウト
      router.push("/auth/signIn"); // ログインページにリダイレクト
    } catch (error) {
      console.error("ログアウトエラー:", error);
    }
  };

  return (
    <button
      onClick={handleLogout}
      className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
    >
      ログアウト
    </button>
  );
};

export default LogoutButton;
