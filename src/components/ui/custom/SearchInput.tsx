'use client';

import { Input } from '@/components/ui/input';
import Image from 'next/image';
import { useState } from 'react';
import { cn } from '@/lib/utils';

export function SearchInput() {
  const [searchText, setSearchText] = useState<string>('');

  const handleSearchClick = (): void => {
    if (!searchText.trim()) return;
    console.log('検索クリック' + searchText);
  };

  return (
    <div className="flex w-full items-center justify-center space-x-2">
      <Input
        type="text"
        placeholder="Search..."
        className={cn('w-full max-w-2xl rounded-full')}
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && handleSearchClick()}
      />
      <button onClick={handleSearchClick} className="cursor-pointer">
        <Image src="/search.svg" alt="検索" width={32} height={32} objectFit="contain" />
      </button>
    </div>
  );
}
