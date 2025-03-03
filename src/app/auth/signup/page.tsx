"use client";

import { useState } from "react";
import { useRouter } from "next/navigation"; 
import { supabase } from "@/lib/supabaseClient";

export default function SignUp() {
  const router = useRouter(); 
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSignUp = async () => {
    const { error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      setMessage(error.message);
    } else {
      setMessage("登録完了！メールを確認してください。");
      setTimeout(() => {
        router.push("/signin"); // 2秒後にサインインページへリダイレクト
      }, 2000);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold">Sign Up</h1>
      <input
        className="border p-2 my-2 w-full"
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        className="border p-2 my-2 w-full"
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button className="bg-blue-500 text-white p-2 rounded" onClick={handleSignUp}>
        Sign Up
      </button>
      {message && <p>{message}</p>}
    </div>
  );
}
