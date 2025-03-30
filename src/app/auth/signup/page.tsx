//サインインコンポーネント
'use client';

import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { AuthInput } from '@/components/ui/custom/AuthInput';
import Link from 'next/link';
import Button from '@/components/ui/custom/button';

// サインアップのバリデーションスキーマ
const signUpSchema = z.object({
  name: z
    .string()
    .min(1, 'ユーザー名は必須です')
    .max(50, 'ユーザー名は50文字以内で入力してください'),
  email: z.string().email('正しいメールアドレスを入力してください'),
  password: z.string().min(6, 'パスワードは6文字以上で入力してください'),
});

type SignUpFormData = z.infer<typeof signUpSchema>;

export default function SignUpForm() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<SignUpFormData>({
    resolver: zodResolver(signUpSchema),
  });

  const onSubmit = async (data: SignUpFormData) => {
    try {
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        // レスポンスが正常でない場合、エラーメッセージを設定
        const responseData = await res.json();
        const errorMessage =
          responseData.error === 'duplicate key value violates unique constraint "users_pkey"'
            ? 'すでに登録済みのメールアドレスです'
            : 'しばらく時間をおいて再度お試しください';
        setError('root', { message: errorMessage });
        return;
      }

      // ログイン成功後、プロフィールページにリダイレクト
      router.push('/profile');
    } catch (err: unknown) {
      // ネットワークエラーやその他のエラーが発生した場合
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
        <AuthInput label="Name" type="text" placeholder="Enter your name" {...register('name')} />
        {errors.name && <p className="text-red-500">{errors.name.message}</p>}
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

        <Button>Sign Up</Button>
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
