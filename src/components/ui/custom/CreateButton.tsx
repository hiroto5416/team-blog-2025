//src/components/ui/custom/CreateButton.tsx

import React from "react";
import { Button } from "@/components/ui/button";

export function CreateButton({
  children,
  onClick,
}: {
  children: React.ReactNode;
  onClick?: () => void;
}) {
  return (
    <Button
      onClick={onClick}
      className="border border-[var(--color-accent-cyan)] text-[var(--color-accent-cyan)] hover:bg-[var(--color-accent-cyan)] hover:text-[var(--color-background)] px-6 py-2 rounded-full transition-colors duration-200"
    >
      {children}
    </Button>
  );
}
