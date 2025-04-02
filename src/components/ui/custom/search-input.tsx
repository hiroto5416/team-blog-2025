import { Input } from '@/components/ui/input';

interface SearchInputProps {
  value: string;
  onChange: (query: string) => void;
  onEnterPress: () => void;
  onSearch: () => void;
}

export function SearchInput({ value, onChange, onEnterPress, onSearch }: SearchInputProps) {
  return (
    <div className="flex w-full items-center justify-center space-x-2">
      <Input
        type="text"
        placeholder="Search..."
        className="h-11 w-full rounded-lg border border-gray-300 bg-transparent p-2 text-[var(--color-foreground)]"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && onEnterPress()}
      />
    </div>
  );
}
