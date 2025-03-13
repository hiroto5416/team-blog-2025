"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SignUpForm() {
  const router = useRouter();
  const [name, setName] = useState(""); // 名前のstate追加
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false); // 送信中の状態を追跡

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");
    setIsSubmitting(true); // フォーム送信時にボタンを無効化

    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }), // nameを追加
      });

      const data = await res.json();

      if (!res.ok) {
        setMessage(data.error || "サインアップに失敗しました。");
        throw new Error(data.error);
      }

      setMessage("サインアップ成功！メールを確認してください。");
      router.push("/auth/signin");
    } catch (error: unknown) {
      if (error instanceof Error) {
        setMessage(error.message);
      } else {
        setMessage("サインアップに失敗しました。");
      }
    } finally {
      setIsSubmitting(false); // 処理完了後にボタンを再度有効化
    }
  };

  return (
    <div className="p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-xl font-bold mb-4">サインアップ</h2>
      <form onSubmit={handleSignUp} className="space-y-4">
        <input
          type="text"
          placeholder="名前"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded"
        />
        <input
          type="email"
          placeholder="メールアドレス"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded"
        />
        <input
          type="password"
          placeholder="パスワード（6文字以上）"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded"
        />
        <button
          type="submit"
          disabled={isSubmitting} // 送信中はボタンを無効化
          className={`w-full p-2 rounded ${isSubmitting ? 'bg-gray-400' : 'bg-blue-500'} text-white`}
        >
          {isSubmitting ? "送信中..." : "サインアップ"}
        </button>
      </form>
      {message && <p className="mt-2 text-sm text-red-500">{message}</p>}
    </div>
  );
}
