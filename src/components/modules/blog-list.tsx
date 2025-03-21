// components/modules/blog-list.tsx
import BlogCard from "@/components/modules/blog-card";

interface BlogListProps {
  searchQuery: string;
  currentPage: number; // ページネーション対応
}

const postsPerPage = 3; // 1ページに表示する記事数

/** ダミーポスト */
const dummyPosts = Array.from({ length: 9 }).map((_, i) => ({
  id: (i + 1).toString(),
  title: `Post Title ${i + 1}`,
  category: "プログラミング",
  author: "Author",
  createdAt: "a min ago",
  image: "/images/placeholder.jpg",
}));

export default function BlogList({ searchQuery, currentPage }: BlogListProps) {
  // 検索クエリに基づいて記事をフィルタリング
  const filteredPosts = dummyPosts.filter((post) =>
    post.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // ページネーションの計算
  const startIndex = (currentPage - 1) * postsPerPage;
  const paginatedPosts = filteredPosts.slice(startIndex, startIndex + postsPerPage);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {paginatedPosts.map((post) => (
        <BlogCard key={post.id} post={post} />
      ))}

      {/* 記事がない場合の表示 */}
      {paginatedPosts.length === 0 && (
        <p className="text-center col-span-full text-gray-500">
          該当する記事が見つかりませんでした。
        </p>
      )}
    </div>
  );
}
