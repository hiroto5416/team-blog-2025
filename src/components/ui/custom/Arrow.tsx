//src/components/ui/custom/Arrow.tsx

"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { Upload } from "lucide-react";
import { Button } from "@/components/ui/button";

type ArrowProps = {
  previewSrc: string | null;
  onDropFile: (file: File) => void;
  onRemove: () => void;
};

export function Arrow({ previewSrc, onDropFile, onRemove }: ArrowProps) {
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file) onDropFile(file);
    setIsDragOver(false);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) onDropFile(file);
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div
      className={`relative flex h-64 w-full max-w-3xl cursor-pointer flex-col items-center justify-center border-2 border-dashed rounded-lg transition-colors duration-200 ${
        isDragOver ? "border-[var(--color-accent-cyan)] bg-[var(--color-accent-cyan)/0.1]" : "border-[var(--color-muted)] bg-[var(--color-background)]"
      }`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      onClick={handleClick}
      contentEditable={false}
    >
      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        className="hidden"
        onChange={handleFileChange}
      />

      {previewSrc ? (
        <>
          <Image
            src={previewSrc}
            alt="Uploaded Preview"
            fill
            className="object-cover rounded-lg"
          />
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onRemove();
            }}
            className="absolute top-2 right-2 bg-red-600 text-white text-sm px-2 py-1 rounded hover:bg-red-700 transition-colors"
          >
            削除
          </button>
        </>
      ) : (
        <div className="text-center text-[var(--color-muted-foreground)] flex flex-col items-center pointer-events-none">
          <Upload className="text-[var(--color-muted)]" size={48} />
          <Button
            variant="outline"
            className="mt-2 pointer-events-auto border border-[var(--color-accent-cyan)] text-[var(--color-accent-cyan)] hover:bg-[var(--color-accent-cyan)] hover:text-white px-6 py-2 rounded-full transition-colors duration-200"
          >
            Upload Image
          </Button>
        </div>
      )}
    </div>
  );
}
