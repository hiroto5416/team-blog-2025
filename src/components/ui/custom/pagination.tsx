// components/ui/custom/pagination.tsx
'use client';

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
  if (totalPages <= 1) return null; // 記事がゼロ、または1ページのみなら非表示

  const maxPagesToShow = 10; // 最大表示ページ数
  const pageNumbers = Array.from(new Set([1, totalPages])); // 1と最後のページは常に表示

  // 現在のページを中心にページを取得
  let startPage = Math.max(2, currentPage - Math.floor((maxPagesToShow - 2) / 2));
  let endPage = Math.min(totalPages - 1, startPage + maxPagesToShow - 3);

  // 末尾に近い場合、startPage を調整
  if (endPage === totalPages - 1) {
    startPage = Math.max(2, totalPages - (maxPagesToShow - 2));
  }

  // ページリストを作成
  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(i);
  }

  // 省略記号の追加
  const finalPageNumbers = [];
  let lastPage = 0;
  for (let page of pageNumbers.sort((a, b) => a - b)) {
    if (lastPage && page - lastPage > 1) {
      finalPageNumbers.push('...');
    }
    finalPageNumbers.push(page);
    lastPage = page;
  }

  return (
    <div className="mx-auto flex items-center space-x-2">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="rounded bg-[var(--color-card)] px-3 py-1 text-[var(--color-foreground)] hover:bg-[var(--color-accent-green)] disabled:opacity-50"
      >
        ← Previous Page
      </button>
      {finalPageNumbers.map((p) => (
        <button
          key={p}
          onClick={() => typeof p === 'number' && onPageChange(p)}
          disabled={typeof p !== 'number'}
          className={`rounded px-3 py-1 ${
            currentPage === p
              ? 'bg-[var(--color-accent-green)] text-black'
              : 'bg-[var(--color-card)] text-[var(--color-foreground)]'
          } ${typeof p === 'number' ? 'cursor-pointer hover:bg-[var(--color-accent-green)] hover:text-black' : ''} }`}
        >
          {p}
        </button>
      ))}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="rounded bg-[var(--color-card)] px-3 py-1 text-[var(--color-foreground)] hover:bg-[var(--color-accent-green)] disabled:opacity-50"
      >
        Next Page →
      </button>
    </div>
  );
}
