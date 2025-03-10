// components/modules/blog-card.tsx
import Link from "next/link";

interface Post {
  id: string; // stringに統一
  title: string;
  category: string;
  author: string;
  createdAt: string;
  image: string;
}

interface BlogCardProps {
  post: Post;
  /** リンク先を上書きしたい場合に使用 (例: /blog/edit/:id) */
  customLink?: string; 
}

export default function BlogCard({ post, customLink }: BlogCardProps) {
  if (!post?.id) {
    return null;
  }

  // デフォルトリンク (/blog/[id]) とカスタムリンクを使い分け
  const href = customLink ?? `/blog/${post.id}`;

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
        <h3 className="font-bold text-lg text-[var(--color-foreground)]">
          {post.title}
        </h3>
        <p className="text-sm text-[var(--color-muted)]">{post.category}</p>
        <div className="text-xs text-[var(--color-muted)] flex justify-between mt-2">
          <span>{post.author}</span>
          <span>{post.createdAt}</span>
        </div>
      </div>
    </Link>
  );
}
