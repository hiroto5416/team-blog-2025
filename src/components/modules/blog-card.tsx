// src/components/modules/blog-card.tsx
import Link from "next/link";
import { BlogCardProps } from "@/types/blog-card";

export default function BlogCard({ post, customLink }: BlogCardProps) {
  if (!post?.id) return null;

  const href = customLink ?? `/articledetail/${post.id}`;

  return (
    <Link
      href={href}
      className="block bg-[var(--color-card)] rounded-[var(--radius-lg)] shadow-md overflow-hidden transition hover:shadow-lg"
    >
      <div className="relative w-full h-48">
        <img
          src={post.image}
          alt={post.title}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="p-4">
        <div className="flex justify-between items-center mb-2">
          <h3 className="font-bold text-lg text-[var(--color-foreground)]">
            {post.title}
          </h3>
          <p className="text-sm text-[var(--color-muted)]">{post.category}</p>
        </div>

        <div className="flex justify-between text-xs text-[var(--color-muted)] mb-2">
          <div className="flex gap-2">
            <span>{post.author}</span>
            <span>{post.createdAt}</span>
          </div>
        </div>

        <p className="text-sm text-[var(--color-muted-foreground)] line-clamp-3">
          {post.description}
        </p>
      </div>
    </Link>
  );
}
