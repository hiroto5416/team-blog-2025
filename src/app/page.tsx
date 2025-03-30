'use client';

import { useState } from "react";
import { SearchInput } from "@/components/ui/custom/search-input";
import CustomPagination from "@/components/ui/custom/pagination";
import BlogCard from "@/components/modules/blog-card";
import Button from "@/components/ui/custom/button";

// ダミーデータ
const dummyBlogs = [
  {
    id: '1',
    title: 'Next.jsの基礎',
    category: 'フロントエンド',
    author: '山田太郎',
    userImage: '/images/user-icon-default.png',
    content: 'Next.jsの基本的な使い方について解説します...',
    image: '/images/placeholder.jpg',
    createdAt: '2024-03-15',
  },
  {
    id: '2',
    title: 'TypeScriptの型システム',
    category: 'プログラミング',
    author: '鈴木花子',
    userImage: '/images/user-icon-default.png',
    content: 'TypeScriptの型システムについて詳しく説明します...',
    image: '/images/placeholder.jpg',
    createdAt: '2024-03-14',
  },
  {
    id: '3',
    title: 'Reactのベストプラクティス',
    category: 'フロントエンド',
    author: '佐藤一郎',
    userImage: '/images/user-icon-default.png',
    content: 'Reactアプリケーションの開発におけるベストプラクティスを紹介します...',
    image: '/images/placeholder.jpg',
    createdAt: '2024-03-13',
  },
  {
    id: '4',
    title: 'Node.jsとExpress',
    category: 'バックエンド',
    author: '田中美咲',
    userImage: '/images/user-icon-default.png',
    content: 'Node.jsとExpressを使用したサーバーサイド開発について...',
    image: '/images/placeholder.jpg',
    createdAt: '2024-03-12',
  },
  {
    id: '5',
    title: 'GraphQLの入門',
    category: 'API',
    author: '高橋健一',
    userImage: '/images/user-icon-default.png',
    content: 'GraphQLの基本概念と実装方法について解説します...',
    image: '/images/placeholder.jpg',
    createdAt: '2024-03-11',
  },
  {
    id: '6',
    title: 'Docker入門',
    category: 'インフラ',
    author: '中村優子',
    userImage: '/images/user-icon-default.png',
    content: 'Dockerの基本的な使い方とコンテナ化について...',
    image: '/images/placeholder.jpg',
    createdAt: '2024-03-10',
  },
  {
    id: '7',
    title: 'AWS Lambda活用術',
    category: 'クラウド',
    author: '小林正人',
    userImage: '/images/user-icon-default.png',
    content: 'AWS Lambdaを使用したサーバーレスアプリケーションの開発...',
    image: '/images/placeholder.jpg',
    createdAt: '2024-03-09',
  },
  {
    id: '8',
    title: 'CI/CDパイプライン構築',
    category: 'DevOps',
    author: '渡辺真理',
    userImage: '/images/user-icon-default.png',
    content: '効率的なCI/CDパイプラインの構築方法について...',
    image: '/images/placeholder.jpg',
    createdAt: '2024-03-08',
  },
  {
    id: '9',
    title: 'Pythonデータ分析',
    category: 'データサイエンス',
    author: '木村達也',
    userImage: '/images/user-icon-default.png',
    content: 'Pythonを使用したデータ分析の基礎と応用...',
    image: '/images/placeholder.jpg',
    createdAt: '2024-03-07',
  },
];

export default function HomePage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchInputValue, setSearchInputValue] = useState("");
  const totalPages = Math.ceil(dummyBlogs.length / 9);

  // 検索実行
  const executeSearch = () => {
    setSearchQuery(searchInputValue);
    setCurrentPage(1);
  };

  // 検索入力のハンドラー
  const handleSearch = (query: string) => {
    setSearchInputValue(query);
  };

  // ページ変更ハンドラー
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  // 検索結果のフィルタリング
  const filteredBlogs = searchQuery
    ? dummyBlogs.filter(blog =>
        blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        blog.category.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : dummyBlogs;

  return (
    <div className="min-h-screen bg-[var(--color-background)]">
      <main className="max-w-6xl mx-auto px-4 py-8">
        {/* ヘッダー部分 */}
        <div className="mb-8 flex items-center justify-between">
          <h1 className="text-3xl font-bold text-[var(--color-foreground)]">
            記事一覧
          </h1>
          <Button
            onClick={() => {
              // TODO: ログイン状態の確認とリダイレクト処理を実装
              const isLoggedIn = false; // 仮の実装。実際にはログイン状態を確認する
              if (isLoggedIn) {
                window.location.href = '/articlecreate'; // 記事作成ページへ
              } else {
                window.location.href = '/login'; // ログインページへ
              }
            }}
            className="bg-[rgb(0,255,76)] text-white hover:bg-transparent hover:text-white"
          >
            新規登録
          </Button>
        </div>

        {/* 検索バー */}
        <div className="mb-8 flex w-full items-center justify-center space-x-2">
          <SearchInput
            value={searchInputValue}
            onChange={handleSearch}
            onEnterPress={executeSearch}
            onSearch={executeSearch}
          />
          <Button
            onClick={executeSearch}
            className="h-11 bg-[rgb(0,255,76)] text-white hover:bg-transparent hover:text-white"
          >
            検索
          </Button>
        </div>

        {/* 記事一覧 */}
        <div className="grid grid-cols-3 gap-6 mb-8">
          {filteredBlogs.slice((currentPage - 1) * 9, currentPage * 9).map((blog) => (
            <BlogCard
              key={blog.id}
              post={blog}
            />
          ))}
        </div>

        {/* ページネーション */}
        <div className="flex justify-center">
          <CustomPagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      </main>
    </div>
  );
}
