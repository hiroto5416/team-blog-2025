import { useState } from "react";
import Input from "@/components/ui/custom/input";
import Button from "@/components/ui/custom/button";

export default function CommentInput({ onCommentSubmit }: { onCommentSubmit: (comment: string) => void }) {
  const [comment, setComment] = useState("");

  const handleSubmit = () => {
    if (comment.trim() !== "") {
      onCommentSubmit(comment);
      setComment("");
    }
  };

  return (
    <div className="mt-4 p-4 bg-[#1E1E1E] border border-gray-600 rounded-lg">
      <h3 className="text-lg font-semibold text-[var(--color-accent-green)]">コメントを投稿</h3>
      <Input
        type="text"
        placeholder="コメントを入力..."
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        className="w-full"
      />
      <Button onClick={handleSubmit} className="mt-2 w-full">
        投稿
      </Button>
    </div>
  );
}
