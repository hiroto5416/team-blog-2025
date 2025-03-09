'use client';

import Image from 'next/image';
import { useState } from 'react';

export function Arrow() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isDragOver, setIsDragOver] = useState<boolean>(false);

  // ドラッグオーバー時の処理
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  // ドラッグアウト時の処理
  const handleDragLeave = () => {
    setIsDragOver(false);
  };

  // ドロップ時の処理
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files ? e.dataTransfer.files[0] : null;
    setSelectedFile(file);
    setIsDragOver(false);
  };

  // ボタン押下時の処理
  const handleSubmit = () => {
    if (selectedFile) {
      console.log('ファイルアップロード：' + selectedFile.name);
    }
  };
  return (
    <>
      <div
        className={`relative flex h-80 w-full max-w-2xl flex-col items-center justify-center border-2 border-dashed ${isDragOver ? 'border-blue-500 bg-blue-100' : 'border-gray-300'}`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        {selectedFile ? (
          <Image
            src={URL.createObjectURL(selectedFile)} // ドロップしたファイルを表示
            alt="Uploaded Image"
            width={250}
            height={250}
            className="absolute"
          />
        ) : (
          <div className="text-center text-gray-500">
            <p>画像をドラッグ＆ドロップしてください</p>
          </div>
        )}
      </div>
      <div>
        <button
          onClick={handleSubmit}
          disabled={!selectedFile}
          className="rounded-lg bg-blue-500 px-4 py-2 text-white disabled:opacity-50"
        >
          ボタン
        </button>
      </div>
      {/* {selectedFile && (
        <div className="mt-2 text-sm text-gray-700">
          <strong>選択されたファイル:</strong> {selectedFile.name}
        </div>
      )} */}
    </>
  );
}
