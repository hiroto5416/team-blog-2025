import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

type AuthInputProps = {
  label: string;
  type: string;
  name: string;
  placeholder: string;
};

export function AuthInput(props: AuthInputProps) {
  const { label, type, name, placeholder } = props;
  return (
    <div className="grid w-full max-w-sm items-center gap-1.5">
      <Label htmlFor={label}>{name}</Label>
      <Input type={type} id={label} placeholder={placeholder} />
    </div>
  );
}
