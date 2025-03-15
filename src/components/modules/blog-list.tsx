// components/modules/blog-list.tsx
import BlogCard from "@/components/modules/blog-card";

interface BlogListProps {
  searchQuery: string;
}

/** ダミーポスト */
const dummyPosts = Array.from({ length: 9 }).map((_, i) => ({
  id: (i + 1).toString(),
  title: `Post Title ${i + 1}`,
  category: "プログラミング",
  author: "Author",
  createdAt: "a min ago",
  image: "/images/placeholder.jpg",
}));

export default function BlogList({ searchQuery }: BlogListProps) {
  // 検索クエリに基づいて記事をフィルタリング
  const filteredPosts = dummyPosts.filter((post) =>
    post.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {filteredPosts.map((post) => (
        <BlogCard key={post.id} post={post} />
      ))}
    </div>
  );
}
