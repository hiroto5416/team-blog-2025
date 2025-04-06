// src/components/modules/blog-card.tsx
import Link from 'next/link';
import Image from 'next/image';
import { BlogCardProps } from '@/types/blog-card';

export default function BlogCard({ post, customLink }: BlogCardProps) {
  if (!post?.id) return null;

  const href = customLink ?? `/articledetail/${post.id}`;

  return (
    <Link
      href={href}
      className="block overflow-hidden rounded-[var(--radius-lg)] bg-[var(--color-card)] shadow-md transition hover:shadow-lg"
    >
      <div className="relative h-48 w-full">
        <Image src={post.image} alt={post.title} fill className="object-cover" />
      </div>

      <div className="p-4">
        <div className="mb-2 flex items-center justify-between">
          <h3 className="text-lg font-bold text-[var(--color-foreground)]">{post.title}</h3>
          <p className="text-sm text-[var(--color-muted)]">{post.category}</p>
        </div>

        <div className="mb-2 flex justify-between text-xs text-[var(--color-muted)]">
          <div className="flex gap-2">
            <span>{post.author}</span>
            <span>{post.createdAt}</span>
          </div>
        </div>

        <p className="line-clamp-3 text-sm text-[var(--color-muted-foreground)]">
          {post.description}
        </p>
      </div>
    </Link>
  );
}
