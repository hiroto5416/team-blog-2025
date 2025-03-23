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

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(''); // エラーメッセージをリセット

    try {
      const res = await fetch('/api/auth/signup', { // ✅ 修正: signup API を呼び出す
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }), // ✅ name も送信
      });

      if (!res.ok) {
        const data = await res.json();
        setError(data.error || 'サインアップに失敗しました');
        return;
      }

      console.log('サインアップ成功');

      // サインアップ成功後、ログインページへリダイレクト
      router.push('/auth/signin');
    } catch (err: unknown) {
      console.error('Error during signup:', err);
      setError('サーバーエラーが発生しました');
    }
  };

  return (
    <div className="mx-auto flex h-screen w-full items-center justify-center">
      <form
        onSubmit={handleSignUp} // ✅ 修正: 正しい関数を呼び出す
        className="flex w-full max-w-2xl flex-col items-center justify-center gap-4"
      >
        <AuthInput
          label="Name"
          name="name"
          type="text"
          placeholder="Enter your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <AuthInput
          label="Email"
          name="email"
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <AuthInput
          label="Password"
          name="password"
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        {error && <p className="text-red-500">{error}</p>}
        <button type="submit" className="rounded bg-blue-500 p-2 text-white">
          Sign Up {/* ✅ 修正: スペルミス修正 */}
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
