// src/app/articleedit/[id]/page.tsx

'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabaseClient';
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
  const [previewSrc, setPreviewSrc] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [categoryList, setCategoryList] = useState<Category[]>([]);
  const [categoryId, setCategoryId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDelete, setIsDelete] = useState(false);

  useEffect(() => {
    // カテゴリを取得
    const fetchCategories = async () => {
      try {
        const response = await fetch(`/api/categories`);
        const result = await response.json();
        if (!response.ok) {
          throw new Error(result.error || 'カテゴリの取得に失敗しました');
        }

        const data: Category[] = result.data;
        setCategoryList(data);
      } catch (error) {
        console.error('カテゴリ取得エラー:', error);
        setError(error instanceof Error ? error.message : 'カテゴリの取得に失敗しました');
      }
    };
    fetchCategories();
  }, [router]);

  useEffect(() => {
    // 記事を取得
    const fetchBlog = async () => {
      try {
        const response = await fetch(`/api/articles/${id}`);
        const result = await response.json();

        if (!response.ok) {
          throw new Error(result.error || '記事の取得に失敗しました');
        }

        const data: Blog = result;
        setTitle(data.title);
        setContent(data.content);
        setPreviewSrc(data.image_path);
        setCategoryId(data.category?.id.toString() ?? null);
      } catch (error) {
        console.error('記事取得エラー:', error);
        setError(error instanceof Error ? error.message : '記事の取得に失敗しました');
      }
    };
    if (id) fetchBlog();
  }, [id]);

  const handleFileDrop = (file: File) => {
    setImageFile(file);
    const reader = new FileReader();
    reader.onloadend = () => setPreviewSrc(reader.result as string);
    reader.readAsDataURL(file);
  };

  // 記事の更新
  const handleUpdate = async () => {
    if (!title.trim()) {
      setError('タイトルを入力してください');
      return;
    } else if (!content.trim()) {
      setError('本文を入力してください');
      return;
    } else if (!categoryId) {
      setError('カテゴリを選択してください');
      return;
    }

    try {
      setIsSubmitting(true);
      setError(null);
      let finalImagePath = previewSrc;
      // 画像ファイルが新しく指定されていればアップロードする
      if (imageFile) {
        const fileExt = imageFile.name.split('.').pop();
        const fileName = `${crypto.randomUUID()}.${fileExt}`;
        const filePath = `posts/${fileName}`;

        const { error: uploadError } = await supabase.storage
          .from('images')
          .upload(filePath, imageFile);

        if (uploadError) {
          setError('画像のアップロードに失敗しました');
          return;
        }

        const {
          data: { publicUrl },
        } = supabase.storage.from('images').getPublicUrl(filePath);

        finalImagePath = publicUrl;
      }

      const body = {
        title,
        content,
        category_id: categoryId,
        image_path: finalImagePath,
      };

      const response = await fetch(`/api/articles/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });

      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.error || '記事の更新に失敗しました');
      }

      alert('記事が更新されました！');
    } catch (error) {
      console.error('記事更新エラー:', error);
      setError(error instanceof Error ? error.message : '記事の更新に失敗しました');
    } finally {
      setIsSubmitting(false);
    }
  };

  // 記事の削除
  const handleDelete = async () => {
    try {
      setIsDelete(true);
      const response = await fetch(`/api/articles/${id}`, {
        method: 'DELETE',
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || '記事の削除に失敗しました');
      }

      alert('記事が削除されました！');
      router.push('/profile');
    } catch (error) {
      console.error('記事更新エラー:', error);
      setError(error instanceof Error ? error.message : '記事の削除に失敗しました');
    } finally {
      setIsDelete(false);
    }
  };

  return (
    <section className="mx-auto max-w-3xl space-y-6 p-4">
      {error && <div className="rounded-md bg-red-500 p-3 text-white">{error}</div>}
      {/* タイトル入力 */}
      <Input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title |"
        className="placeholder:text-muted text-3xl font-bold"
      />

      {/* 画像アップロード - Arrowを使用 */}
      <Arrow
        previewSrc={previewSrc}
        onDropFile={handleFileDrop}
        onRemove={() => {
          setPreviewSrc(null);
          setImageFile(null);
        }}
      />

      {/* 本文 + カテゴリ */}
      <div className="relative">
        <div className="rounded-xl border border-[var(--color-muted)] bg-[var(--color-card)] p-4 text-[var(--color-foreground)]">
          <div className="mb-2 flex justify-end">
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
        <CreateButton onClick={handleUpdate} disabled={isSubmitting}>
          {isSubmitting ? '送信中...' : 'Edit'}
        </CreateButton>
        <CreateButton onClick={handleDelete} disabled={isDelete}>
          {isDelete ? '削除中...' : 'Delete'}
        </CreateButton>
      </div>
    </section>
  );
}
