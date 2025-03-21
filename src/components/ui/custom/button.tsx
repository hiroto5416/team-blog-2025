// components/ui/custom/button.tsx
"use client";

import { Button as ShadcnButton } from "@/components/ui/button"; // shadcn UIの例
import { cn } from "@/lib/utils";

interface CustomButtonProps extends React.ComponentProps<typeof ShadcnButton> {}

/** ボタンをラップして追加スタイルを付与 */
export default function Button({ className, ...props }: CustomButtonProps) {
  return (
    <ShadcnButton
      className={cn("bg-[var(--color-accent-green)] text-black font-semibold", className)}
      {...props}
    />
  );
}
