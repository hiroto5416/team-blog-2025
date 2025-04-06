import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

interface SearchInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  onEnterPress?: () => void;
  onSearch?: () => void;
}

export default function SearchInput({ className, onEnterPress, ...props }: SearchInputProps) {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && onEnterPress) {
      onEnterPress();
    }
  };

  return (
    <div className="flex w-full items-center justify-center space-x-2">
      <Input
        type="search"
        placeholder="Search..."
        className={cn(
          'h-11 w-full rounded-lg border border-gray-300 bg-transparent p-2 text-[var(--color-foreground)]',
          className,
        )}
        onKeyDown={handleKeyDown}
        {...props}
      />
    </div>
  );
}
