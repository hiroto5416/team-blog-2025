import React from "react";
import { Button } from "@/components/ui/button";

/**
 * クリック可能なボタンを作成するコンポーネント
 * @param {React.ReactNode} children - ボタンのテキスト
 * @param {() => void} onClick - クリック時のイベントハンドラ
 */
export function CreateButton({ children, onClick }: { children: React.ReactNode; onClick?: () => void }) {
  return (
    <Button className="rounded-md px-4 py-2" onClick={onClick}>
      {children}
    </Button>
  );
}