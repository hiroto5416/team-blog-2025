// components/ui/custom/card.tsx
"use client";

import { cn } from "@/lib/utils";
import React from "react";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {}

export default function Card({ className, children, ...props }: CardProps) {
  return (
    <div
      {...props}
      className={cn(
        "bg-[var(--color-card)] text-[var(--color-foreground)] rounded-[var(--radius-lg)] shadow-md",
        className
      )}
    >
      {children}
    </div>
  );
}
