"use client";

import { useEffect, useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import LogoutButton from "../../components/modules/auth/LogoutButton";
import { Session } from "@supabase/auth-helpers-nextjs";
import BlogCard from "@/components/modules/blog-card";
import { Blog } from "@/types/blog";

const ProfilePage = () => {
  const supabase = createClientComponentClient();
  const [session, setSession] = useState<Session | null>(null);
  const [userBlogs, setUserBlogs] = useState<Blog[]>([]);

  useEffect(() => {
    const fetchSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setSession(session);
    };
    fetchSession();
  }, [supabase]);

  useEffect(() => {
    const fetchUserBlogs = async () => {
      if (!session?.user.id) return;

      try {
        const res = await fetch("/api/articles");
        const allBlogs: Blog[] = await res.json();

        const filtered = allBlogs.filter(blog => blog.user_id === session.user.id);
        setUserBlogs(filtered);
      } catch (error) {
        console.error("記事の取得に失敗しました", error);
      }
    };

    if (session) fetchUserBlogs();
  }, [session]);

  return (
    <div className="max-w-3xl mx-auto mt-12 p-6 bg-[var(--color-card)] shadow-md rounded-lg">
      {session ? (
        <div>
          <h2 className="text-2xl font-bold mb-4 text-[var(--color-foreground)]">
            {session.user.email}
          </h2>
          <LogoutButton />

          <h3 className="text-xl font-semibold mt-10 mb-4 text-[var(--color-foreground)]">
            Your Posts
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {userBlogs.map((blog) => (
              <BlogCard key={blog.id} post={{
                id: blog.id,
                title: blog.title,
                category: blog.categories.name,
                author: blog.users.name,
                createdAt: new Date(blog.created_at).toLocaleDateString(),
                image: blog.image_path
              }} />
            ))}
          </div>
        </div>
      ) : (
        <p className="text-center text-[var(--color-muted-foreground)]">ログインしてください</p>
      )}
    </div>
  );
};

export default ProfilePage;
