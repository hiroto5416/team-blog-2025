// components/ui/custom/search-input.tsx
import { useState } from "react";

interface SearchBarProps {
  onSearch: (query: string) => void;
}

export default function SearchBar({ onSearch }: SearchBarProps) {
  const [query, setQuery] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    onSearch(value); // 親コンポーネントに検索クエリを渡す
  };

  return (
    <input
      type="text"
      value={query}
      onChange={handleInputChange}
      placeholder="検索..."
      className="w-full p-2 border border-gray-300 rounded-lg"
    />
  );
}
