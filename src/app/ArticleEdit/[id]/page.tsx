// src/app/articleedit/[id]/page.tsx

"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import Input from "@/components/ui/custom/input";
import { CustomTextarea } from "@/components/ui/custom/CustomTextarea";
import { CreateButton } from "@/components/ui/custom/CreateButton";
import { CategorySelect } from "@/components/ui/custom/CategorySelect";
import { Arrow } from "@/components/ui/custom/Arrow"; // Arrowを使用

// ダミーデータ（仮のデフォルト記事）
const dummyArticles = {
  "101": {
    title: "ユーザ記事1",
    category: "Programming",
    content: "これはユーザ記事1の本文です。",
    imageUrl: "/images/placeholder.jpg",
  },
  "102": {
    title: "ユーザ記事2",
    category: "Design",
    content: "これはユーザ記事2の本文です。",
    imageUrl: "/images/placeholder.jpg",
  },
};

export default function EditBlogPage() {
  const { id } = useParams();
  const article = dummyArticles[id as keyof typeof dummyArticles] || {
    title: "",
    category: "",
    content: "",
    imageUrl: "/images/placeholder.jpg",
  };

  const [title, setTitle] = useState(article.title);
  const [category, setCategory] = useState(article.category);
  const [content, setContent] = useState(article.content);
  const [previewSrc, setPreviewSrc] = useState<string | null>(article.imageUrl);

  const handleUpdate = () => {
    console.log("更新データ:", { title, category, content, previewSrc });
    alert("記事が更新されました！（ダミー）");
  };

  return (
    <section className="max-w-3xl mx-auto space-y-6 p-4">
      {/* タイトル入力 */}
      <Input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title |"
        className="text-3xl font-bold placeholder:text-muted"
      />

      {/* 画像アップロード - Arrowを使用 */}
      <Arrow
        previewSrc={previewSrc}
        onDropFile={(file) => {
          const reader = new FileReader();
          reader.onloadend = () => {
            setPreviewSrc(reader.result as string);
          };
          reader.readAsDataURL(file);
        }}
        onRemove={() => setPreviewSrc(null)}
      />

      {/* 本文 + カテゴリ */}
      <div className="relative">
        <div className="rounded-xl bg-[var(--color-card)] text-[var(--color-foreground)] border border-[var(--color-muted)] p-4">
          <div className="absolute top-6 right-6 z-10">
            <CategorySelect value={category} onChange={setCategory} />
          </div>

          <CustomTextarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="本文を入力..."
            className="h-48"
          />
        </div>
      </div>

      {/* 更新ボタン */}
      <div className="flex justify-end">
        <CreateButton onClick={handleUpdate}>Edit</CreateButton>
      </div>
    </section>
  );
}
