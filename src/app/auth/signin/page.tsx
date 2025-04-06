// src/app/auth/signin/page.tsx
'use client';

import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { AuthInput } from '@/components/ui/custom/AuthInput';
import Link from 'next/link';
import Button from '@/components/ui/custom/button';

// サインインのバリデーションスキーマ
const signInSchema = z.object({
  email: z.string().email('正しいメールアドレスを入力してください'),
  password: z.string().min(6, 'パスワードは6文字以上で入力してください'),
});

type SignInFormData = z.infer<typeof signInSchema>;

export default function SignIn() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<SignInFormData>({
    resolver: zodResolver(signInSchema),
  });

  const onSubmit = async (data: SignInFormData) => {
    try {
      const res = await fetch('/api/auth/signin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        // レスポンスが正常でない場合、エラーメッセージを設定
        const responseData = await res.json();
        const errorMessage =
          responseData.error === 'Email not confirmed'
            ? '送信された確認メールのリンクをクリックし、メールアドレスを確認済みにしてください'
            : 'メールアドレスまたはパスワードが間違っています';
        setError('root', { message: errorMessage });
        return;
      }

      // ログイン成功後、ヘッダーのセッション更新が即座に反映されない問題を解決するため、
      // クライアント全体をフルリロードして最新のセッション状態を取得させる
      window.location.href = '/profile';
    } catch (err: unknown) {
      console.error('Error during login:', err);
      setError('root', { message: 'サーバーエラーが発生しました' });
    }
  };

  return (
    <div className="mx-auto flex h-screen w-full items-center justify-center">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex w-full max-w-2xl flex-col items-center justify-center gap-4"
      >
        <AuthInput
          label="Email"
          type="email"
          placeholder="Enter your email"
          {...register('email')}
        />
        {errors.email && <p className="text-red-500">{errors.email.message}</p>}
        <AuthInput
          label="Password"
          type="password"
          placeholder="Enter your password"
          {...register('password')}
        />
        {errors.password && <p className="text-red-500">{errors.password.message}</p>}

        {/* 全体的なエラーメッセージ */}
        {errors.root && <p className="text-red-500">{errors.root.message}</p>}

        <Button>Sign In</Button>

        <p>
          Don&apos;t have an account?{' '}
          <Link href="/auth/signup" className="text-blue-500 underline hover:text-blue-700">
            Sign Up
          </Link>
        </p>
      </form>
    </div>
  );
}
