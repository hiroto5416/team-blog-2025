//src/components/ui/custom/CategorySelect.tsx

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select";
  
  interface Props {
    value: string;
    onChange: (value: string) => void;
  }
  
  export const CategorySelect = ({ value, onChange }: Props) => {
    return (
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger className="w-[140px] text-sm">
          <SelectValue placeholder="Category" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="Programming">Programming</SelectItem>
          <SelectItem value="Design">Design</SelectItem>
          <SelectItem value="Life">Life</SelectItem>
        </SelectContent>
      </Select>
    );
  };
  