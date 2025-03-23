import React from "react";
import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react"; 

interface AuthButtonProps {
  children: React.ReactNode;
  provider: "google" | "github";
}

/**
 * Google または GitHub での認証を行うボタンを作成するコンポーネント
 * @param {React.ReactNode} children - ボタンのテキスト
 * @param {"google" | "github"} provider - 認証プロバイダ
 */
const AuthButton = ({ children, provider }: AuthButtonProps) => {
  return (
    <Button variant="outline" onClick={() => signIn(provider)}>
      {children}
    </Button>
  );
};

export { AuthButton };
