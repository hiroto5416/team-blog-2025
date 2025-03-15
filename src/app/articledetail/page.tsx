'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import TextareaAutosize from 'react-textarea-autosize';

interface Article {
  id: string;
  title: string;
  userImage: string | null;
  author: string;
  image: string | null;
  content: string;
}

interface Comment {
  id: string;
  userImage: string | null;
  author: string;
  content: string;
}

export default function ArticleDetailPage() {
  const [article] = useState<Article | null>({
    id: '1',
    title: 'サンプル記事',
    userImage: '/images/avatar.png',
    author: 'サンプル著者',
    image: '/images/dummy-image.jpg',
    content: 'これはサンプル記事です。記事の内容は後で編集してください。',
  });
  const comments: Comment[] = [
    {
      id: '1',
      userImage: '/images/avatar.png',
      author: 'サンプルユーザー1',
      content: 'サンプルコメント1',
    },
    {
      id: '2',
      userImage: '/images/avatar.png',
      author: 'サンプルユーザー2',
      content: 'サンプルコメント2',
    },
  ];
  const [newComment, setNewComment] = useState('');

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // コメントの投稿処理（後で実装）
  };

  if (!article) {
    return <div>記事が見つかりませんでした。</div>;
  }

  return (
    <div className="flex flex-col items-center">
      <article className="p-8 w-9/10 mx-auto border rounded-md mt-8">
         <div className="flex items-start justify-between"> {/* タイトルを左上に配置 */}
          <h1 className="text-3xl font-bold">{article.title}</h1>
          <Image
            src="/images/author-icon.png"
            alt="著者アイコン"
            width={24}
            height={24}
            className="rounded-full"
          />
        </div>
        <div className="flex items-center text-sm text-gray-500"> {/* 記事のメタ情報を最上部に配置 */}
          <p>2023年10月27日</p>
          <p className="ml-2">カテゴリー: テクノロジー</p>
          <p className="ml-2">タグ: Next.js, React</p>
        </div>
        {/* 記事のメタ情報、著者名、記事コンテンツ、共有ボタン、関連記事、著者情報を追加 */}
      </article>

      {/* コメントセクション */}
      <section className="mt-8 mx-auto w-[40%]"> {/* コメント欄の幅を強制的に調整 */}
        <h2 className="text-2xl font-semibold">コメント</h2>

        {/* コメント入力フォーム */}
        <form onSubmit={handleCommentSubmit} className="mt-4 flex">
          <TextareaAutosize
            value={newComment}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setNewComment(e.target.value)}
            placeholder="コメントを入力してください"
            className="border rounded-md p-3 flex-grow focus:outline-none focus:ring-1 focus:ring-blue-500 text-lg"
          />
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md ml-2 text-lg">
            コメント
          </button>
        </form>

        {/* コメントリスト */}
        <ul className="mt-4">
          {comments.map((comment: Comment) => (
            <li key={comment.id} className="py-3 border-b border-gray-200">
              <div className="flex items-start">
                <Image
                  src={comment.userImage || '/images/default-avatar.png'}
                  alt="アバター"
                  width={32}
                  height={32}
                  className="rounded-full mr-2"
                />
                <div>
                  <p className="text-lg font-semibold">{comment.author}</p>
                  <p className="text-lg text-gray-600">{comment.content}</p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}