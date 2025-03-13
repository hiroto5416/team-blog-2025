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
    <div>
      {session ? <p>ログイン済み: {session.user.email}</p> : <p>未ログイン</p>}
<LogoutButton />
    </div>
  );
};

export default ProfilePage;

   