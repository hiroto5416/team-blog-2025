//src/components/ui/custom/CreateButton.tsx

import React from 'react';
import { Button } from '@/components/ui/button';

export function CreateButton({
  children,
  onClick,
  disabled,
}: {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
}) {
  return (
    <Button
      onClick={onClick}
      disabled={disabled}
      className="rounded-full border border-[var(--color-accent-cyan)] px-6 py-2 text-[var(--color-accent-cyan)] transition-colors duration-200 hover:bg-[var(--color-accent-cyan)] hover:text-[var(--color-background)]"
    >
      {children}
    </Button>
  );
}
