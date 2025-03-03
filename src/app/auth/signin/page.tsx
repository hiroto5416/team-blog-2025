"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";

export default function SignIn() {
  const router = useRouter(); 
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSignIn = async () => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setMessage(error.message);
    } else {
      setMessage("ログイン成功！");
      router.push("/dashboard"); // ダッシュボードページへリダイレクト
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold">Sign In</h1>
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
      <button className="bg-green-500 text-white p-2 rounded" onClick={handleSignIn}>
        Sign In
      </button>
      {message && <p>{message}</p>}
    </div>
  );
}

