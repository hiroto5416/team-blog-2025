//サインインコンポーネント
'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { AuthInput } from '@/components/ui/custom/AuthInput';
import Link from 'next/link';

export default function SignUpForm() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(''); // エラーメッセージをリセット

    try {
      const res = await fetch('/api/auth/signin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) {
        // レスポンスが正常でない場合、エラーメッセージを設定
        const data = await res.json();
        setError(data.error || 'ログインに失敗しました');
        return;
      }

      // レスポンスデータを受け取る
      const data = await res.json();

      console.log('ログイン成功:', data);

      // ログイン成功後、プロフィールページにリダイレクト
      router.push('/profile');
    } catch (err: unknown) {
      // ネットワークエラーやその他のエラーが発生した場合
      console.error('Error during login:', err);
      setError('サーバーエラーが発生しました');
    }
  };

  return (
    <div className="mx-auto flex h-screen w-full items-center justify-center">
      <form
        onSubmit={handleSignIn}
        className="flex w-full max-w-2xl flex-col items-center justify-center gap-4"
      >
        <AuthInput
          label="name"
          name="Name"
          type="text"
          placeholder="Enter your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <AuthInput
          label="email"
          name="Email"
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <AuthInput
          label="password"
          name="Password"
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        {error && <p className="text-red-500">{error}</p>}
        <button type="submit" className="rounded bg-blue-500 p-2 text-white">
          Sing Up
        </button>
        <p>
          Already have an account?{' '}
          <Link href="/auth/signin" className="text-blue-500 underline hover:text-blue-700">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}
