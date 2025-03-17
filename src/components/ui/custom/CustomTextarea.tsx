import React from 'react';
import { Textarea } from "@/components/ui/textarea";

/**
 * スタイリングされたテキストエリアを作成するコンポーネント
 * @param {string} className - 追加のクラス名
 * @param {React.TextareaHTMLAttributes<HTMLTextAreaElement>} props - Textarea コンポーネントの props
 * @param {React.Ref<HTMLTextAreaElement>} ref - Textarea コンポーネントの ref
 */
const CustomTextarea = React.forwardRef<HTMLTextAreaElement, React.TextareaHTMLAttributes<HTMLTextAreaElement>>(
  ({ className, ...props }, ref) => {
    return (
      <Textarea
        ref={ref}
        className={`border border-gray-300 rounded-md p-2 w-full ${className}`}
        {...props}
      />
    );
  }
);
CustomTextarea.displayName = "CustomTextarea";

export { CustomTextarea };