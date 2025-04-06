// src/components/modules/user-menu.tsx
'use client';

import * as React from 'react';
import Image from 'next/image';
import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover';

type UserMenuProps = {
  userImage?: string;
  userEmail?: string;
  onLogout: () => void;
};

export function UserMenu({ userImage, userEmail, onLogout }: UserMenuProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <button
          type="button"
          aria-label="Open user menu"
          className="rounded-full focus:ring-2 focus:ring-[var(--color-accent-blue)] focus:ring-offset-2 focus:outline-none"
        >
          <Image
            src={userImage || '/images/dummy-user.png'}
            alt="User Icon"
            width={32}
            height={32}
            className="rounded-full transition hover:opacity-80"
          />
        </button>
      </PopoverTrigger>

      <PopoverContent
        align="end"
        sideOffset={8}
        className="z-50 w-56 rounded-xl border border-[var(--color-muted)] bg-[var(--color-card)] p-4 shadow-md"
      >
        <div className="mb-2 text-sm font-semibold text-[var(--color-foreground)]">{userEmail}</div>

        <button
          onClick={onLogout}
          className="w-full rounded-md border border-red-500 bg-red-500 py-1 text-sm text-white hover:bg-red-600"
        >
          Logout
        </button>
      </PopoverContent>
    </Popover>
  );
}
