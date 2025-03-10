"use client";

import { useState } from "react";
import { Upload } from "lucide-react"; // アップロード用アイコン
import Image from "next/image";

export default function CreateBlogPage() {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [content, setContent] = useState("");
  const [previewSrc, setPreviewSrc] = useState<string | null>(null);

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

  const handleCreate = () => {
    // バックエンド接続時にAPI通信を実装
    console.log("作成データ:", { title, category, content, previewSrc });
    alert("投稿が完了しました！（ダミー）");
  };

  return (
    <section className="space-y-8">
      {/* Title 見出し */}
      <h1 className="text-3xl font-bold text-[var(--color-foreground)]">
        Title
      </h1>

      {/* 大きな画像アップロード枠 */}
      <div className="relative w-full h-64 border-2 border-dashed border-[var(--color-muted)] rounded-lg flex flex-col items-center justify-center">
        {!previewSrc ? (
          // 画像未選択時 → アップロードUI
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
          // 画像選択後プレビュー
          <div className="w-full h-full relative">
            <Image
              src={previewSrc}
              alt="Preview"
              fill
              className="object-cover rounded-lg"
            />
            {/* 再アップロード用ボタン */}
            <button
              onClick={() => setPreviewSrc(null)}
              className="absolute top-2 right-2 text-sm bg-red-600 text-white px-2 py-1 rounded"
            >
              削除
            </button>
          </div>
        )}
      </div>

      {/* Category を画面右上に置きたい場合 */}
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

      {/* 本文入力 */}
      <textarea
        className="w-full h-40 p-2 rounded bg-[var(--color-card)] border border-[var(--color-muted)] text-[var(--color-foreground)]"
        placeholder="本文を入力..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
      ></textarea>

      {/* 右下に Create ボタン */}
      <div className="flex justify-end">
        <button
          onClick={handleCreate}
          className="px-6 py-2 bg-[var(--color-accent-green)] text-black font-bold rounded-lg"
        >
          Create
        </button>
      </div>
    </section>
  );
}
