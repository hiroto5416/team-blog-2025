import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

type AuthInputProps = {
  label: string;
  type: string;
  name: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
};

export function AuthInput(props: AuthInputProps) {
  const { label, type, name, placeholder, value, onChange, required } = props;
  return (
    <div className="grid w-full max-w-sm items-center gap-1.5">
      <Label htmlFor={label}>{name}</Label>
      <Input
        type={type}
        id={label}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
      />
    </div>
  );
}
