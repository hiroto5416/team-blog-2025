// src/ui/custom/user-menu.tsx
"use client";

import * as React from "react";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import Image from "next/image";
import Button from "@/components/ui/custom/button";

type UserMenuProps = {
  userImage?: string | null;
  userEmail?: string;
};

export function UserMenu({ userImage, userEmail }: UserMenuProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <button
          type="button"
          aria-label="Open user menu"
          className="rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[var(--color-accent-blue)]"
        >
          <Image
            src={userImage || "/images/dummy-user.png"}
            alt="User Icon"
            width={32}
            height={32}
            className="rounded-full hover:opacity-80 transition"
          />
        </button>
      </PopoverTrigger>

      <PopoverContent
        align="end"
        sideOffset={8}
        className="w-56 rounded-xl border border-[var(--color-muted)] bg-[var(--color-card)] p-4 shadow-md z-50"
      >
        <div className="mb-2 text-sm text-[var(--color-foreground)] font-semibold">
          {userEmail}
        </div>

        <form action="/auth/signout" method="post">
          <Button
            type="submit"
            className="w-full border border-red-500 bg-red-500 text-white hover:bg-red-600 text-sm py-1"
          >
            Logout
          </Button>
        </form>
      </PopoverContent>
    </Popover>
  );
}
