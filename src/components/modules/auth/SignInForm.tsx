"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SignInForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");  // エラーメッセージをリセット

    try {
      const res = await fetch("/api/auth/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) {
        // レスポンスが正常でない場合、エラーメッセージを設定
        const data = await res.json();
        setError(data.error || "ログインに失敗しました");
        return;
      }

      // レスポンスデータを受け取る
      const data = await res.json();

      console.log("ログイン成功:", data);

      // ログイン成功後、プロフィールページにリダイレクト
      router.push("/profile");

    } catch (err: unknown) {
      // ネットワークエラーやその他のエラーが発生した場合
      console.error("Error during login:", err);
      setError("サーバーエラーが発生しました");
    }
  };

  return (
    <form onSubmit={handleSignIn} className="flex flex-col gap-4">
      <input
        type="email"
        placeholder="メールアドレス"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        className="border p-2 rounded"
      />
      <input
        type="password"
        placeholder="パスワード"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        className="border p-2 rounded"
      />
      {error && <p className="text-red-500">{error}</p>}
      <button type="submit" className="bg-blue-500 text-white p-2 rounded">
        ログイン
      </button>
    </form>
  );
}
