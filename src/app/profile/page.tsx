//app/profile/page.tsx
"use client";

import { useEffect, useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import LogoutButton from "../../components/modules/auth/LogoutButton";
import { Session } from "@supabase/auth-helpers-nextjs";

const ProfilePage = () => {
  const supabase = createClientComponentClient();
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    const fetchSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setSession(session);
    };

    fetchSession();
  }, [supabase]);

  return (
    <div className="max-w-3xl mx-auto mt-12 p-6 bg-[var(--color-card)] shadow-md rounded-lg">
      {session ? (
        <div className="flex flex-col items-center">
          <h2 className="text-2xl font-bold text-[var(--color-foreground)]">{session.user.email}</h2>
          <LogoutButton />
        </div>
      ) : (
        <p className="text-center text-[var(--color-muted-foreground)]">ログインしてください</p>
      )}
    </div>
  );
};

export default ProfilePage;

   