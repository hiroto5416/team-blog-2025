'use client';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

// カテゴリ型
type Category = {
  id: number;
  name: string;
};

type Props = {
  categories: Category[];
  value: string | null;
  onChange: (value: string) => void;
};

export const CategorySelect = ({ categories, value, onChange }: Props) => {
  return (
    <Select value={value !== null ? String(value) : ''} onValueChange={(val) => onChange(val)}>
      <SelectTrigger className="iline-block min-w-[235px] text-sm">
        <SelectValue placeholder="カテゴリ選択" />
      </SelectTrigger>
      <SelectContent className="bg-[var(--color-card)]">
        {categories.map((cat) => (
          <SelectItem key={cat.id} value={String(cat.id)}>
            {cat.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};
