"use client";

import { useState } from "react";
import Button from "@/components/ui/custom/button";
import Card from "@/components/ui/custom/card";
import Input from "@/components/ui/custom/input";

export default function AuthPage() {
  const [userInfo, setUserInfo] = useState({
    name: "ゲスト",
    email: "guest@example.com",
  });

  return (
    <section className="flex flex-col items-center justify-center min-h-screen px-4">
      <Card className="p-6 w-full max-w-4xl">
        <h2 className="text-2xl font-bold text-[var(--color-accent-cyan)]">認証ページ</h2>
        <p className="text-gray-400">ログイン機能が未実装のため、ゲストデータを表示中</p>
        
        <div className="mt-4 space-y-4 w-full">
          <div>
            <label className="text-sm text-gray-300">名前</label>
            <Input type="text" value={userInfo.name} disabled className="w-full" />
          </div>
          <div>
            <label className="text-sm text-gray-300">メールアドレス</label>
            <Input type="email" value={userInfo.email} disabled className="w-full" />
          </div>
          <Button className="w-full">設定を変更（未実装）</Button>
        </div>
      </Card>
    </section>
  );
}
