// components/modules/comment-section.tsx
"use client";

import { useState } from "react";
import Card from "@/components/ui/custom/card";
import Input from "@/components/ui/custom/input";
import Button from "@/components/ui/custom/button";

interface Comment {
  id: string;
  user: string;
  userImage?: string; // 画像パス。未定義ならフォールバックを使用
  text: string;
  createdAt: string;
}

interface CommentSectionProps {
  blogId: string; // Will be used for API integration to fetch and post comments
}

export default function CommentSection({ blogId }: CommentSectionProps) {
  const [commentList, setCommentList] = useState<Comment[]>([
    {
      id: "1",
      user: "User1",
      userImage: "/images/user-icon-default.png", // デフォルトまたは任意の画像
      text: "面白いですね！",
      createdAt: "a min ago",
    },
    {
      id: "2",
      user: "User2",
      // userImage: "/images/dummy-user.png", 
      text: "参考になります。",
      createdAt: "2 min ago",
    },
  ]);
  const [inputValue, setInputValue] = useState("");

  const handleAddComment = () => {
    if (!inputValue.trim()) return;

    // 新しいコメントを追加する例
    const newComment: Comment = {
      id: String(commentList.length + 1),
      user: "You",
      userImage: "/images/dummy-user.png", // ログインユーザー用アイコン（ダミー）
      text: inputValue,
      createdAt: "just now",
    };
    setCommentList([...commentList, newComment]);
    setInputValue("");
  };

  return (
    <div className="mt-4 space-y-4">
      <h3 className="text-xl font-bold text-[var(--color-foreground)]">Comments</h3>

      <div className="flex space-x-2">
        <Input
          value={inputValue}
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
          <Card key={c.id} className="p-2 flex gap-2 items-start">
            {/* userImage が無ければ /images/user-icon-default.png を使う */}
            <img
              src={c.userImage || "/images/user-icon-default.png"}
              alt="User Icon"
              className="w-8 h-8 rounded-full"
            />
            <div>
              <p className="text-sm text-[var(--color-muted)]">
                {c.user} ・ {c.createdAt}
              </p>
              <p className="text-[var(--color-foreground)] mt-1">{c.text}</p>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
