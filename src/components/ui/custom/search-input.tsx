'use client';

import { Input } from '@/components/ui/input';
import { useState } from 'react';
// import Image from 'next/image';
// import { cn } from '@/lib/utils';

interface SearchInputProps {
  onSearch: (query: string) => void;
}

export function SearchInput({ onSearch }: SearchInputProps) {
  const [searchText, setSearchText] = useState<string>('');

  const handleSearchClick = (): void => {
    if (!searchText.trim()) return;
    onSearch(searchText);
  };

  return (
    <div className="flex w-full items-center justify-center space-x-2">
      <Input
        type="text"
        placeholder="Search..."
        className="h-11 w-full rounded-lg border border-gray-300 bg-transparent p-2 text-[var(--color-foreground)]"
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && handleSearchClick()}
      />
    </div>
  );
}
