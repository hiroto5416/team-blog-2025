// src/app/articleedit/[id]/page.tsx

'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import Input from '@/components/ui/custom/input';
import { CustomTextarea } from '@/components/ui/custom/CustomTextarea';
import { CreateButton } from '@/components/ui/custom/CreateButton';
import { CategorySelect } from '@/components/ui/custom/CategorySelect';
import { Arrow } from '@/components/ui/custom/Arrow'; // Arrowを使用
import { Blog } from '@/types/blog';

type Category = {
  id: number;
  name: string;
};

export default function EditBlogPage() {
  const router = useRouter();
  const { id } = useParams();

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [imagePath, setImagePath] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [categoryList, setCategoryList] = useState<Category[]>([]);
  const [categoryId, setCategoryId] = useState<number | null>(null);

  useEffect(() => {
    // カテゴリを取得
    const fetchCategories = async () => {
      try {
        const response = await fetch(`/api/categories`);
        const result = await response.json();

        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          throw new Error(errorData.error || '記事の作成に失敗しました');
        }

        const data: Category[] = result.data;
        setCategoryList(data);
      } catch (error) {
        console.error('Category fetch error:', error);
        throw error;
      }
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    // 記事を取得
    const fetchBlog = async () => {
      try {
        const response = await fetch(`/api/articles/${id}`);

        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          throw new Error(errorData.error || '記事の取得に失敗しました');
        }

        const data: Blog = await response.json();
        console.log(data);

        setTitle(data.title);
        setContent(data.content);
        setImagePath(data.image_path);
        setCategoryId(data.category?.id ?? null);
      } catch (error) {
        console.error('Blog fetch error:', error);
        throw error;
      }
    };
    if (id) fetchBlog();
  }, [id]);

  // 記事の更新
  const handleUpdate = async () => {
    if (!id) return;

    try {
      let uploadedImagePath = imagePath;

      // 新しい画像が指定されている場合のみアップロード
      if (imageFile) {
        const formData = new FormData();
        formData.append('image', imageFile);

        const res = await fetch('/api/upload', {
          method: 'POST',
          body: formData,
        });

        const result = await res.json();

        if (!res.ok) {
          throw new Error(result.error || '画像のアップロードに失敗しました');
        }

        uploadedImagePath = result.image_path;
      }

      // 記事の更新（JSON形式）
      const response = await fetch(`/api/articles/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title,
          content,
          category_id: categoryId,
          image_path: uploadedImagePath, // 画像を変更してなければ元のをそのまま使う
        }),
      });

      console.log({
        title,
        content,
        category_id: categoryId,
        image_path: uploadedImagePath,
        // image_path: null,
      });

      const result = await response.json();
      console.log(result);
      if (!response.ok) {
        throw new Error(result.error || '記事の更新に失敗しました');
      }

      alert('記事が更新されました！');
    } catch (error) {
      console.error('Blog update error:', error);
      alert('記事更新時にエラーが発生しました');
    }
  };

  // 記事の削除
  const handleDelete = async () => {
    try {
      const response = await fetch(`/api/articles/${id}`, {
        method: 'DELETE',
      });

      const result = await response.json();
      console.log(result);
      alert('記事を削除しました');
      router.push('/profile');
    } catch (error) {
      console.error('Blog delete error:', error);
      alert('記事削除時にエラーが発生しました');
    }
  };

  return (
    <section className="mx-auto max-w-3xl space-y-6 p-4">
      {/* タイトル入力 */}
      <Input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title |"
        className="placeholder:text-muted text-3xl font-bold"
      />

      {/* 画像アップロード - Arrowを使用 */}
      <Arrow
        previewSrc={imagePath}
        onDropFile={(file) => {
          const reader = new FileReader();
          reader.onloadend = () => {
            setImagePath(reader.result as string); // プレビュー用
            setImageFile(file); // アップロード用
          };
          reader.readAsDataURL(file);
        }}
        onRemove={() => {
          setImagePath(null);
          setImageFile(null);
        }}
      />

      {/* 本文 + カテゴリ */}
      <div className="relative">
        <div className="rounded-xl border border-[var(--color-muted)] bg-[var(--color-card)] p-4 text-[var(--color-foreground)]">
          <div className="absolute top-6 right-6 z-10">
            <CategorySelect categories={categoryList} value={categoryId} onChange={setCategoryId} />
          </div>

          <CustomTextarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="本文を入力..."
            className="h-48"
          />
        </div>
      </div>

      {/* 更新/削除ボタン */}
      <div className="flex justify-end gap-3">
        <CreateButton onClick={handleUpdate}>Edit</CreateButton>
        <CreateButton onClick={handleDelete}>Delete</CreateButton>
      </div>
    </section>
  );
}
