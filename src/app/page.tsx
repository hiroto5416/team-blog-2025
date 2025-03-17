"use client";

import React from 'react';

export default function HomePage() {
  const blogs = [
    {
      id: '1',
      title: 'ブログ記事1',
      author: '著者1',
      content: 'ブログ記事1の内容',
    },
    {
      id: '2',
      title: 'ブログ記事2',
      author: '著者2',
      content: 'ブログ記事2の内容',
    },
    {
      id: '3',
      title: 'ブログ記事3',
      author: '著者3',
      content: 'ブログ記事3の内容',
    },
    {
      id: '4',
      title: 'ブログ記事4',
      author: '著者4',
      content: 'ブログ記事4の内容',
    },
    {
      id: '5',
      title: 'ブログ記事5',
      author: '著者5',
      content: 'ブログ記事5の内容',
    },
    {
      id: '6',
      title: 'ブログ記事6',
      author: '著者6',
      content: 'ブログ記事6の内容',
    },
    {
      id: '7',
      title: 'ブログ記事7',
      author: '著者7',
      content: 'ブログ記事7の内容',
    },
    {
      id: '8',
      title: 'ブログ記事8',
      author: '著者8',
      content: 'ブログ記事8の内容',
    },
    {
      id: '9',
      title: 'ブログ記事9',
      author: '著者9',
      content: 'ブログ記事9の内容',
    },
  ];

  return (
    <div className="p-4">
      {/* 検索バー */}
      <div className="p-4 flex justify-center mt-4"> {/* 検索バーの周りに余白を追加 */}
        <div className="max-w-md w-full">
          <input
            type="text"
            placeholder="Search..."
            className="border rounded-md px-4 py-2 w-full"
          />
        </div>
      </div>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-4 gap-y-4">
        {blogs.map((blog) => (
          <article key={blog.id} className="border p-4 rounded-md flex flex-col"> {/* flex-col を追加 */}
            <div className="w-full h-60 object-cover rounded-md flex justify-center items-center">
              ⚫︎
            </div>
            <div className="mt-2"> {/* タイトル、著者名、記事概要を囲む div を追加 */}
              <h2 className="text-xl font-semibold">{blog.title}</h2>
              <p className="text-sm text-gray-500">By {blog.author}</p>
              <p className="mt-2">{blog.content.substring(0, 100)}...</p>
            </div>
          </article>
        ))}
      </section>
    </div>
  );
}