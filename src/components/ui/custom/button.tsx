// components/ui/custom/button.tsx
"use client";

import { Button as ShadcnButton } from "@/components/ui/button"; // shadcn UIの例
import { cn } from "@/lib/utils";

interface CustomButtonProps extends React.ComponentProps<typeof ShadcnButton> {}

/** ボタンをラップして追加スタイルを付与 */
export default function Button({ className, ...props }: CustomButtonProps) {
  return (
    <ShadcnButton
      className={cn(
        "bg-[var(--color-accent-green)] text-black font-semibold",
        "border border-gray-300 hover:border-[var(--color-accent-blue-dark)]", // 枠線追加
        "px-4 py-2 rounded transition-colors",
        className
      )}
      {...props}
    />
  );
}
