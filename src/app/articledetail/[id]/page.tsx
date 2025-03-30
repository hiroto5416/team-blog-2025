"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import CommentSection from "@/components/modules/comment-section";
import { Skeleton } from "@/components/ui/skeleton";

// ダミーデータ
const dummyBlogs = [
  {
    id: "1",
    title: "Next.jsの基礎",
    category: "フロントエンド",
    author: "山田太郎",
    userImage: "/images/user-icon-default.png",
    content: `
      Next.jsの基本的な使い方について解説します。

      1. Routing
      - ファイルベースのルーティング
      - 動的ルーティング
      - ミドルウェアの活用

      2. データフェッチング
      - Server Components
      - Client Components
      - キャッシュの活用

      3. 最適化
      - 画像の最適化
      - フォントの最適化
      - メタデータの設定
    `,
    image: "/images/placeholder.jpg",
    createdAt: "2024-03-15",
  },
  {
    id: "2",
    title: "TypeScriptの型システム",
    category: "プログラミング",
    author: "鈴木花子",
    userImage: "/images/user-icon-default.png",
    content: `
      TypeScriptの型システムについて詳しく説明します。

      1. 基本的な型
      - プリミティブ型
      - オブジェクト型
      - 配列型

      2. 高度な型機能
      - ジェネリクス
      - ユニオン型とインターセクション型
      - 型ガード

      3. 実践的な型の使い方
      - インターフェース
      - 型エイリアス
      - ユーティリティ型
    `,
    image: "/images/placeholder.jpg",
    createdAt: "2024-03-14",
  },
  {
    id: "3",
    title: "Reactのベストプラクティス",
    category: "フロントエンド",
    author: "佐藤一郎",
    userImage: "/images/user-icon-default.png",
    content: `
      Reactアプリケーションの開発におけるベストプラクティスを紹介します。

      1. コンポーネント設計
      - 単一責任の原則
      - コンポーネントの分割
      - Props の設計

      2. パフォーマンス最適化
      - メモ化
      - 不要な再レンダリングの防止
      - Code Splitting

      3. 状態管理
      - ローカル状態とグローバル状態
      - カスタムフック
      - コンテキストの活用
    `,
    image: "/images/placeholder.jpg",
    createdAt: "2024-03-13",
  },
  {
    id: "4",
    title: "Node.jsとExpress",
    category: "バックエンド",
    author: "田中美咲",
    userImage: "/images/user-icon-default.png",
    content: `
      Node.jsとExpressを使用したサーバーサイド開発について解説します。

      1. 基本設定
      - Express のセットアップ
      - ミドルウェアの設定
      - ルーティング

      2. データベース連携
      - MongoDB との接続
      - CRUD 操作
      - バリデーション

      3. API 設計
      - RESTful API
      - エラーハンドリング
      - 認証と認可
    `,
    image: "/images/placeholder.jpg",
    createdAt: "2024-03-12",
  },
  {
    id: "5",
    title: "GraphQLの入門",
    category: "API",
    author: "高橋健一",
    userImage: "/images/user-icon-default.png",
    content: `
      GraphQLの基本概念と実装方法について解説します。

      1. スキーマ定義
      - 型定義
      - クエリとミューテーション
      - サブスクリプション

      2. リゾルバー
      - クエリリゾルバー
      - ミューテーションリゾルバー
      - 関係の解決

      3. クライアント実装
      - Apollo Client
      - キャッシュ管理
      - エラーハンドリング
    `,
    image: "/images/placeholder.jpg",
    createdAt: "2024-03-11",
  },
  {
    id: "6",
    title: "Docker入門",
    category: "インフラ",
    author: "中村優子",
    userImage: "/images/user-icon-default.png",
    content: `
      Dockerの基本的な使い方とコンテナ化について解説します。

      1. 基本概念
      - コンテナとは
      - イメージとは
      - Dockerfile の書き方

      2. コンテナ管理
      - コンテナのライフサイクル
      - ネットワーク設定
      - ボリューム管理

      3. 実践的な使用方法
      - Docker Compose
      - マルチステージビルド
      - 本番環境での運用
    `,
    image: "/images/placeholder.jpg",
    createdAt: "2024-03-10",
  },
  {
    id: "7",
    title: "AWS Lambda活用術",
    category: "クラウド",
    author: "小林正人",
    userImage: "/images/user-icon-default.png",
    content: `
      AWS Lambdaを使用したサーバーレスアプリケーションの開発について解説します。

      1. 基本設定
      - 関数の作成
      - トリガーの設定
      - IAM ロール

      2. 開発手法
      - ローカル開発環境
      - デプロイメント
      - モニタリング

      3. ベストプラクティス
      - エラーハンドリング
      - パフォーマンス最適化
      - コスト管理
    `,
    image: "/images/placeholder.jpg",
    createdAt: "2024-03-09",
  },
  {
    id: "8",
    title: "CI/CDパイプライン構築",
    category: "DevOps",
    author: "渡辺真理",
    userImage: "/images/user-icon-default.png",
    content: `
      効率的なCI/CDパイプラインの構築方法について解説します。

      1. CI/CD の基本
      - 継続的インテグレーション
      - 継続的デリバリー
      - 継続的デプロイメント

      2. ツール選定
      - GitHub Actions
      - Jenkins
      - CircleCI

      3. パイプライン設計
      - テスト自動化
      - ビルド最適化
      - デプロイ戦略
    `,
    image: "/images/placeholder.jpg",
    createdAt: "2024-03-08",
  },
  {
    id: "9",
    title: "Pythonデータ分析",
    category: "データサイエンス",
    author: "木村達也",
    userImage: "/images/user-icon-default.png",
    content: `
      Pythonを使用したデータ分析の基礎と応用について解説します。

      1. データ処理
      - Pandas の基本
      - データクレンジング
      - データ変換

      2. 分析手法
      - 記述統計
      - 可視化
      - 機械学習の基礎

      3. 実践的なワークフロー
      - データパイプライン
      - モデル評価
      - レポーティング
    `,
    image: "/images/placeholder.jpg",
    createdAt: "2024-03-07",
  },
];

interface Blog {
  id: string;
  title: string;
  author: string;
  userImage: string;
  content: string;
  image: string;
  category: string;
  createdAt: string;
}

export default function BlogDetailPage() {
  const params = useParams();
  const blogId = params.id as string | undefined;
  const [blog, setBlog] = useState<Blog | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        setIsLoading(true);
        // ダミーデータから記事を検索
        const foundBlog = dummyBlogs.find(b => b.id === blogId);
        if (foundBlog) {
          setBlog(foundBlog);
        } else {
          setError("記事が見つかりませんでした。");
        }
      } catch (err) {
        setError("記事の取得に失敗しました。");
        console.error("Error fetching blog:", err);
      } finally {
        setIsLoading(false);
      }
    };

    if (blogId) {
      fetchBlog();
    }
  }, [blogId]);

  if (!blogId) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-8">
        <p className="text-red-500">記事IDが指定されていません。</p>
        <Link href="/" className="text-[var(--color-accent-cyan)] mt-4 inline-block">
          ← 記事一覧に戻る
        </Link>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-8">
        <p className="text-red-500">{error}</p>
        <Link href="/" className="text-[var(--color-accent-cyan)] mt-4 inline-block">
          ← 記事一覧に戻る
        </Link>
      </div>
    );
  }

  if (isLoading) {
    return (
      <section className="max-w-3xl mx-auto px-4 py-8 space-y-6">
        <div className="flex items-center justify-between">
          <Skeleton className="h-10 w-3/4" />
          <div className="flex items-center space-x-3">
            <Skeleton className="h-10 w-10 rounded-full" />
          </div>
        </div>

        <Skeleton className="w-full h-72 rounded-md" />

        <div className="space-y-4">
          <Skeleton className="h-4 w-1/4" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-5/6" />
          <Skeleton className="h-4 w-4/6" />
        </div>
      </section>
    );
  }

  if (!blog) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-8">
        <p className="text-red-500">該当の記事は存在しません。</p>
        <Link href="/" className="text-[var(--color-accent-cyan)] mt-4 inline-block">
          ← 記事一覧に戻る
        </Link>
      </div>
    );
  }

  return (
    <section className="max-w-3xl mx-auto px-4 py-8 space-y-6">
      {/* 記事ヘッダー */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <div className="flex items-center space-x-2">
              <span className="px-2 py-1 bg-[var(--color-accent-blue)] text-white text-sm rounded">
                {blog.category}
              </span>
              <span className="text-sm text-[var(--color-muted)]">
                {blog.createdAt}
              </span>
            </div>
            <h1 className="text-3xl font-bold text-[var(--color-foreground)]">
              {blog.title}
            </h1>
          </div>
          <Link href="/" className="text-[var(--color-accent-cyan)]">
            ← 記事一覧
          </Link>
        </div>

        <div className="flex items-center space-x-3">
          <Image
            src={blog.userImage}
            alt={blog.author}
            width={40}
            height={40}
            className="rounded-full"
          />
          <span className="text-[var(--color-foreground)]">{blog.author}</span>
        </div>
      </div>

      {/* アイキャッチ画像 */}
      <div className="w-full h-72 bg-[var(--color-muted)] rounded-lg overflow-hidden">
        <Image
          src={blog.image}
          alt={blog.title}
          width={800}
          height={400}
          className="w-full h-full object-cover"
        />
      </div>

      {/* 記事本文 */}
      <article className="prose prose-invert max-w-none">
        <div className="whitespace-pre-wrap text-[var(--color-foreground)]">
          {blog.content}
        </div>
      </article>

      {/* コメントセクション */}
      <CommentSection />
    </section>
  );
}
