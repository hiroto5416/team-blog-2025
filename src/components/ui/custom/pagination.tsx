// components/ui/custom/pagination.tsx
"use client";

import { useMemo } from "react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function CustomPagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  const pages = useMemo(
    () => Array.from({ length: totalPages }, (_, i) => i + 1),
    [totalPages]
  );

  return (
    <div className="flex items-center space-x-2">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-3 py-1 bg-[var(--color-card)] text-[var(--color-foreground)] rounded hover:bg-[var(--color-accent-green)] disabled:opacity-50"
      >
        &lt; Prev
      </button>
      {pages.map((p) => (
        <button
          key={p}
          onClick={() => onPageChange(p)}
          className={`px-3 py-1 rounded ${
            currentPage === p
              ? "bg-[var(--color-accent-green)] text-black"
              : "bg-[var(--color-card)] text-[var(--color-foreground)] hover:bg-[var(--color-accent-green)] hover:text-black"
          }`}
        >
          {p}
        </button>
      ))}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-3 py-1 bg-[var(--color-card)] text-[var(--color-foreground)] rounded hover:bg-[var(--color-accent-green)] disabled:opacity-50"
      >
        Next &gt;
      </button>
    </div>
  );
}
