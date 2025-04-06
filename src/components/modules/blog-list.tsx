// src/components/modules/blog-list.tsx
import BlogCard from "@/components/modules/blog-card";
import { Blog } from "@/types/blog";
import { Post } from "@/types/blog-card";

interface BlogListProps {
  blogs: Blog[];
}

export default function BlogList({ blogs }: BlogListProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {blogs.length > 0 ? (
        blogs.map((blog) => {
          const blogCardPost: Post = {
            id: blog.id,
            title: blog.title,
            category: blog.category?.name ?? "Uncategorized",
            author: blog.users?.name ?? "Unknown",
            createdAt: new Date(blog.created_at).toLocaleDateString(),
            image: blog.image_path ?? "/images/placeholder.jpg",
            description: blog.content?.substring(0, 100) ?? "",
          };

          return <BlogCard key={blog.id} post={blogCardPost} />;
        })
      ) : (
        <p className="text-center col-span-full text-gray-500">
          該当する記事が見つかりませんでした。
        </p>
      )}
    </div>
  );
}
