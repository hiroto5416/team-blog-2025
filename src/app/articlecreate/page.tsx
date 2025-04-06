'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Input from '@/components/ui/custom/input';
import { CustomTextarea } from '@/components/ui/custom/CustomTextarea';
import { CreateButton } from '@/components/ui/custom/CreateButton';
import { CategorySelect } from '@/components/ui/custom/CategorySelect';
import { Arrow } from '@/components/ui/custom/Arrow';
import { supabase } from '@/lib/supabaseClient';

type Category = {
  id: number;
  name: string;
};

export default function CreateBlogPage() {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [categoryId, setCategoryId] = useState<string>('');
  const [content, setContent] = useState('');
  const [previewSrc, setPreviewSrc] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserAndCategories = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      const user = session?.user;

      if (!user) {
        router.push('/auth/signin');
        return;
      }

      setUserId(user.id);

      try {
        const { data: categoriesData, error: categoriesError } = await supabase
          .from('category')
          .select('id, name')
          .order('name');

        if (categoriesError) {
          console.error('カテゴリー取得エラー:', categoriesError);
          setError('カテゴリーの取得に失敗しました');
          return;
        }

        if (categoriesData?.length) {
          setCategories(categoriesData);
          setCategoryId(categoriesData[0].id.toString());
        }
      } catch (err) {
        console.error('初期データ取得エラー:', err);
        setError('データの取得に失敗しました');
      }
    };

    fetchUserAndCategories();
  }, [router]);

  const handleFileDrop = (file: File) => {
    setImageFile(file);
    const reader = new FileReader();
    reader.onloadend = () => setPreviewSrc(reader.result as string);
    reader.readAsDataURL(file);
  };

  const handleCreate = async () => {
    if (!title.trim() || !content.trim() || !categoryId || !userId) {
      setError('全ての項目を入力してください');
      return;
    }

    try {
      setIsSubmitting(true);
      setError(null);

      const formData = new FormData();
      formData.append('title', title);
      formData.append('content', content);
      formData.append('user_id', userId);
      formData.append('category_id', categoryId);

      if (imageFile) formData.append('image', imageFile);

      const response = await fetch('/api/articles', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || '記事の作成に失敗しました');
      }

      const data = await response.json();
      console.log('作成成功:', data);
      router.push('/');
    } catch (err) {
      console.error('記事作成エラー:', err);
      setError(err instanceof Error ? err.message : '記事の作成に失敗しました');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="mx-auto max-w-3xl space-y-6 p-4">
      {error && <div className="rounded-md bg-red-500 p-3 text-white">{error}</div>}

      <Input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title |"
        className="placeholder:text-muted text-3xl font-bold"
      />

      <Arrow
        previewSrc={previewSrc}
        onDropFile={handleFileDrop}
        onRemove={() => {
          setPreviewSrc(null);
          setImageFile(null);
        }}
      />

      <div className="relative">
        <div className="rounded-xl border border-[var(--color-muted)] bg-[var(--color-card)] p-4 text-[var(--color-foreground)]">
          <div className="mb-2 flex justify-end">
            <CategorySelect categories={categories} value={categoryId} onChange={setCategoryId} />
          </div>

          <CustomTextarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="本文を入力..."
            className="h-48"
          />
        </div>
      </div>

      <div className="flex justify-end">
        <CreateButton onClick={handleCreate} disabled={isSubmitting}>
          {isSubmitting ? '送信中...' : 'Create'}
        </CreateButton>
      </div>
    </section>
  );
}
