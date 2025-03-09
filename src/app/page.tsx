import { Arrow } from '@/components/ui/custom/Arrow';
import { AuthInput } from '@/components/ui/custom/AuthInput';
import { SearchInput } from '@/components/ui/custom/SearchInput';
// import { Spinner } from '@/components/ui/custom/Spinner';

export default function Home() {
  return (
    <div className="my-3 flex flex-col items-center justify-center gap-3">
      <AuthInput label="name" name="Name" type="text" placeholder="Enter your name" />
      <SearchInput />
      {/* <Spinner /> */}
      <Arrow />
    </div>
  );
}
