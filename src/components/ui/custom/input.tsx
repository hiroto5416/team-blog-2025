// components/ui/custom/input.tsx
'use client';

import { Input as ShadcnInput } from '@/components/ui/input';
import { cn } from '@/lib/utils';

export type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

export default function Input({ className, ...props }: InputProps) {
  return (
    <ShadcnInput
      className={cn(
        'rounded-md border border-[var(--color-muted)] bg-[var(--color-card)] px-4 py-2 text-[var(--color-foreground)] placeholder-gray-400',
        className,
      )}
      {...props}
    />
  );
}
