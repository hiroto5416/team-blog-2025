// components/modules/comment-section.tsx
'use client';

import { useEffect } from 'react';
import { useState } from 'react';
import Card from '@/components/ui/custom/card';
import Input from '@/components/ui/custom/input';
import Button from '@/components/ui/custom/button';
import Image from 'next/image';

interface Comment {
  id: string;
  user: string;
  userImage?: string; // 画像パス。未定義ならフォールバックを使用
  text: string;
  createdAt: string;
}

interface CommentData {
  id: string;
  users?: {
    name: string;
    image_path: string;
  };
  content: string;
  created_at: string;
}

interface CommentSectionProps {
  blogId: string; // Will be used for API integration to fetch and post comments
}

export default function CommentSection({ blogId }: CommentSectionProps) {
  const [commentList, setCommentList] = useState<Comment[]>([]);
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await fetch(`/api/comments?postId=${blogId}`);
        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          throw new Error(errorData.error || 'コメントの取得に失敗しました');
        }
        const data = await response.json();

        if (data.data) {
          const formattedComments = data.data.map((comment: CommentData) => ({
            id: comment.id,
            user: comment.users?.name || 'Unknown User',
            userImage: comment.users?.image_path || '/images/user-icon-default.png',
            text: comment.content,
            createdAt: comment.created_at,
          }));
          setCommentList(formattedComments);
        }
      } catch (error) {
        console.error('Error fetching comments:', error);
      }
    };
    fetchComments();
  }, [blogId]);

  const handleAddComment = async () => {
    if (!inputValue.trim()) return; // 空コメントは送信しない
    try {
      const response = await fetch('/api/comments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ postId: blogId, content: inputValue }), // リクエストボディを修正
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || 'コメントの送信に失敗しました');
      }
      const commentData = await response.json(); // レスポンスボディからコメントデータを取得

      // レスポンスから新しいコメントの情報を抽出

      const newComment: Comment = {
        id: commentData.data.id,
        user: commentData.data.user?.name || 'Unknown User',
        userImage: commentData.data.user?.image_path || '/images/user-icon-default.png',
        text: commentData.data.content,

        createdAt: commentData.data.created_at, // 投稿日時をレスポンスから取得
      };
      setCommentList([...commentList, newComment]);
    } catch (error) {
      console.error('Error posting comment:', error);
    } finally {
      setInputValue(''); // コメント送信後にリセット
    }
  };

  return (
    <div className="mt-4 space-y-4">
      <h3 className="text-xl font-bold text-[var(--color-foreground)]">Comments</h3>

      <div className="flex space-x-2">
        <Input
          value={inputValue}
          id="commentInput"
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="コメントを入力..."
          className="flex-1"
        />
        <Button
          type="submit"
          className="bg-[rgb(0,255,76)] text-white hover:bg-transparent hover:text-white"
          onClick={handleAddComment}
        >
          送信
        </Button>
      </div>

      <div className="space-y-2">
        {commentList.map((c) => (
          <Card key={c.id} className="flex items-start gap-2 p-2">
            {/* userImage が無ければ /images/user-icon-default.png を使う */}
            <Image
              src={c.userImage || '/images/user-icon-default.png'}
              alt="User Icon"
              width={32}
              height={32}
              className="rounded-full"
            />
            <div>
              <p className="text-sm text-[var(--color-muted)]">
                {c.user} ・ {c.createdAt}
              </p>
              <p className="mt-1 text-[var(--color-foreground)]">{c.text}</p>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
