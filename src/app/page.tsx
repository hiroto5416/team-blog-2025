"use client";
import { Arrow } from '@/components/ui/custom/Arrow';
import { AuthInput } from '@/components/ui/custom/AuthInput';
import { SearchInput } from '@/components/ui/custom/SearchInput';
import { useRouter } from 'next/navigation';
// import { Spinner } from '@/components/ui/custom/Spinner';


export default function Home() {
  const router = useRouter();
  const handleRedirectSignin = () => {
    router.push("/auth/signin");
  };
  const handleRedirectSignup = () => {
    router.push("/auth/signup");
  };
  return (
    <div className="my-3 flex flex-col items-center justify-center gap-3">
      <AuthInput label="name" name="Name" type="text" placeholder="Enter your name" />
      <SearchInput />
      {/* <Spinner /> */}
      <Arrow />
      <button
        onClick={handleRedirectSignin}
        className="mt-4 rounded-lg bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 transition"
      >ログインページへ
      </button>
      <button
        onClick={handleRedirectSignup}
        className="mt-4 rounded-lg bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 transition"
      >登録(サインアップ)ページへ
      </button>
    </div>
  );
}
