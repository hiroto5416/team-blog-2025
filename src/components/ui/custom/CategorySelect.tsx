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
  value: number | null;
  onChange: (value: number) => void;
};

export const CategorySelect = ({ categories, value, onChange }: Props) => {
  return (
    <Select
      value={value !== null ? String(value) : ''}
      onValueChange={(val) => onChange(Number(val))}
    >
      <SelectTrigger className="w-[140px] text-sm">
        <SelectValue placeholder="カテゴリ選択" />
      </SelectTrigger>
      <SelectContent>
        {categories.map((cat) => (
          <SelectItem key={cat.id} value={String(cat.id)}>
            {cat.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};
