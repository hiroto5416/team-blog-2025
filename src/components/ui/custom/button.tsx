// components/ui/custom/button.tsx
'use client';

import { Button as ShadcnButton } from '@/components/ui/button'; // shadcn UIの例
import { cn } from '@/lib/utils';

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

/** ボタンをラップして追加スタイルを付与 */
export default function Button({ className, ...props }: ButtonProps) {
  return (
    <ShadcnButton
      className={cn(
        'bg-[var(--color-accent-green)] font-semibold text-black',
        'border border-gray-300 hover:border-[var(--color-accent-blue-dark)]', // 枠線追加
        'rounded px-4 py-2 transition-colors',
        className,
      )}
      {...props}
    />
  );
}
