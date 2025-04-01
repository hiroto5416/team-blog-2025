import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

type AuthInputProps = {
  label: string;
  type: string;
  placeholder: string;
} & React.InputHTMLAttributes<HTMLInputElement>;

export function AuthInput(props: AuthInputProps) {
  const { label, type, placeholder, ...rest } = props;
  return (
    <div className="grid w-full max-w-sm items-center gap-1.5">
      <Label htmlFor={label}>{label}</Label>
      <Input type={type} id={label} placeholder={placeholder} {...rest} />
    </div>
  );
}
