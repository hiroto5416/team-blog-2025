// app/ArticleEdit/[id]/page.tsx
"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { Upload } from "lucide-react";
import Image from "next/image";

// ダミーデータ（仮のデフォルト記事）
const dummyArticles = {
  "101": {
    title: "ユーザ記事1",
    category: "雑記",
    content: "これはユーザ記事1の本文です。",
    imageUrl: "/images/placeholder.jpg",
  },
  "102": {
    title: "ユーザ記事2",
    category: "プログラミング",
    content: "これはユーザ記事2の本文です。",
    imageUrl: "/images/placeholder.jpg",
  },
};

export default function EditBlogPage() {
  const { id } = useParams(); // ルートパラメータ取得
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

  // 画像アップロード処理
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewSrc(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUpdate = () => {
    console.log("更新データ:", { title, category, content, previewSrc });
    alert("記事が更新されました！（ダミー）");
  };

  return (
    <section className="space-y-8">
      <h1 className="text-3xl font-bold text-[var(--color-foreground)]">Edit Article</h1>

      {/* 画像アップロード */}
      <div className="relative w-full h-64 border-2 border-dashed border-[var(--color-muted)] rounded-lg flex flex-col items-center justify-center">
        {!previewSrc ? (
          <label className="cursor-pointer flex flex-col items-center">
            <Upload className="text-[var(--color-muted)]" size={48} />
            <span className="text-[var(--color-accent-cyan)] mt-2 text-lg">Upload Image</span>
            <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
          </label>
        ) : (
          <div className="w-full h-full relative">
            <Image src={previewSrc} alt="Preview" fill className="object-cover rounded-lg" />
            <button
              onClick={() => setPreviewSrc(null)}
              className="absolute top-2 right-2 text-sm bg-red-600 text-white px-2 py-1 rounded"
            >
              削除
            </button>
          </div>
        )}
      </div>

      {/* カテゴリー選択 */}
      <div className="flex justify-end">
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="p-2 rounded bg-[var(--color-card)] border border-[var(--color-muted)] text-[var(--color-foreground)]"
        >
          <option value="">Category</option>
          <option value="Programming">Programming</option>
          <option value="Design">Design</option>
          <option value="Life">Life</option>
        </select>
      </div>

      {/* タイトル入力 */}
      <input
        className="w-full p-2 rounded bg-[var(--color-card)] border border-[var(--color-muted)] text-[var(--color-foreground)]"
        placeholder="記事タイトル"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      {/* 本文入力 */}
      <textarea
        className="w-full h-40 p-2 rounded bg-[var(--color-card)] border border-[var(--color-muted)] text-[var(--color-foreground)]"
        placeholder="本文を入力..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
      ></textarea>

      {/* 更新ボタン */}
      <div className="flex justify-end">
        <button onClick={handleUpdate} className="px-6 py-2 bg-[var(--color-accent-green)] text-black font-bold rounded-lg">
          Update
        </button>
      </div>
    </section>
  );
}
