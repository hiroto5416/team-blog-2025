// components/ui/custom/input.tsx
"use client";

import { Input as ShadcnInput } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface CustomInputProps extends React.ComponentProps<typeof ShadcnInput> {}

export default function Input({ className, ...props }: CustomInputProps) {
  return (
    <ShadcnInput
      className={cn(
        "border border-[var(--color-muted)] bg-[var(--color-card)] text-[var(--color-foreground)] placeholder-gray-400 px-4 py-2 rounded-md",
        className
      )}
      {...props}
    />
  );
}
