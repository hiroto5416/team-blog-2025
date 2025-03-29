//src/app/articlecreate/page.tsx
"use client";

import { useState, useEffect } from "react";
import { Upload } from "lucide-react"; // アップロードアイコン
import Image from "next/image";

// ダミーデータ（仮のデフォルト記事）
const dummyArticle = {
  title: "既存の記事タイトル",
  category: "Programming",
  content: "これは既存の記事本文です。",
  imageUrl: "/no-image.png",
};

export default function EditBlogPage() {
  const [title, setTitle] = useState(dummyArticle.title);
  const [category, setCategory] = useState(dummyArticle.category);
  const [content, setContent] = useState(dummyArticle.content);
  const [previewSrc, setPreviewSrc] = useState<string | null>(dummyArticle.imageUrl);

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
    // バックエンドとの接続時にAPIを実装
    console.log("更新データ:", { title, category, content, previewSrc });
    alert("記事が更新されました！（ダミー）");
  };

  return (
    <section className="space-y-8">
      {/* Title */}
      <h1 className="text-3xl font-bold text-[var(--color-foreground)]">
        Edit Article
      </h1>

      {/* 画像アップロード枠 */}
      <div className="relative w-full h-64 border-2 border-dashed border-[var(--color-muted)] rounded-lg flex flex-col items-center justify-center">
        {!previewSrc ? (
          <label className="cursor-pointer flex flex-col items-center">
            <Upload className="text-[var(--color-muted)]" size={48} />
            <span className="text-[var(--color-accent-cyan)] mt-2 text-lg">
              Upload Image
            </span>
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageUpload}
            />
          </label>
        ) : (
          <div className="w-full h-full relative">
            <Image
              src={previewSrc}
              alt="Preview"
              fill
              className="object-cover rounded-lg"
            />
            {/* 削除ボタン */}
            <button
              onClick={() => setPreviewSrc(null)}
              className="absolute top-2 right-2 text-sm bg-red-600 text-white px-2 py-1 rounded"
            >
              削除
            </button>
          </div>
        )}
      </div>

      {/* Category 選択を右上に配置 */}
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

      {/* 更新ボタンを右下に配置 */}
      <div className="flex justify-end">
        <button
          onClick={handleUpdate}
          className="px-6 py-2 bg-[var(--color-accent-green)] text-black font-bold rounded-lg"
        >
          Update
        </button>
      </div>
    </section>
  );
}
