'use client';

import { Input } from '@/components/ui/input';
import { useState } from 'react';
// import Image from 'next/image';
// import { cn } from '@/lib/utils';

interface SearchInputProps {
  onSearch: (query: string) => void;
  onEnterPress?: () => void;
  value?: string;
  onChange?: (value: string) => void;
}

export function SearchInput({ onSearch, onEnterPress, value, onChange }: SearchInputProps) {
  const [localSearchText, setLocalSearchText] = useState<string>('');
  const [isComposing, setIsComposing] = useState(false);
  const searchText = value ?? localSearchText;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    if (onChange) {
      onChange(newValue);
    } else {
      setLocalSearchText(newValue);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !isComposing) {
      if (onEnterPress) {
        onEnterPress();
      } else {
        onSearch(searchText);
      }
    }
  };

  return (
    <div className="flex w-full items-center justify-center space-x-2">
      <Input
        type="text"
        placeholder="キーワードを入力..."
        className="h-11 w-full rounded-lg border border-gray-300 bg-transparent p-2 text-[var(--color-foreground)]"
        value={searchText}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        onCompositionStart={() => setIsComposing(true)}
        onCompositionEnd={() => setIsComposing(false)}
      />
    </div>
  );
}
