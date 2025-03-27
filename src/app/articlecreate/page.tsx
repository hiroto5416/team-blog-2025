//src/app/articlecreate/page.tsx

"use client";

import { useState } from "react";
import Input from "@/components/ui/custom/input";
import { CustomTextarea } from "@/components/ui/custom/CustomTextarea";
import { CreateButton } from "@/components/ui/custom/CreateButton";
import { CategorySelect } from "@/components/ui/custom/CategorySelect";
import { Arrow } from "@/components/ui/custom/Arrow";

export default function CreateBlogPage() {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [content, setContent] = useState("");
  const [previewSrc, setPreviewSrc] = useState<string | null>(null);

  const handleFileDrop = (file: File) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewSrc(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleCreate = () => {
    console.log("作成データ:", { title, category, content, previewSrc });
    alert("記事が作成されました！（ダミー）");
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

      {/* 画像アップロード - Arrowに置換 */}
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
        <div className="rounded-xl bg-muted text-foreground border border-muted p-4">
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

      {/* 作成ボタン */}
      <div className="flex justify-end">
        <CreateButton onClick={handleCreate}>Create</CreateButton>
      </div>
    </section>
  );
}
