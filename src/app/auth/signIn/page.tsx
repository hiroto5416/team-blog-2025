import SignInForm from "@/components/modules/auth/SignInForm";

export default function SignInPage() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-2xl font-bold mb-4">ログイン</h1>
      <h1 className="text-xl font-bold mb-4">//※サインアップしたメールを開いて認証確認をしてからログインしてください</h1>
      <SignInForm />
    </div>
  );
}
