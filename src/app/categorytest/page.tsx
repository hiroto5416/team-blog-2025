'use client';

import { useState, useEffect } from 'react';

type Category = {
  id: number;
  name: string;
  created_at: string;
  updated_at: string;
};

export default function CategoryTestPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [newCategory, setNewCategory] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // カテゴリ一覧を取得
  const fetchCategories = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/categories');
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'カテゴリの取得に失敗しました');
      setCategories(data.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : '不明なエラーが発生しました');
    } finally {
      setLoading(false);
    }
  };

  // 新しいカテゴリを追加
  const addCategory = async () => {
    if (!newCategory.trim()) return alert('カテゴリ名を入力してください');
    
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/categories', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: newCategory.trim() }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'カテゴリの追加に失敗しました');

      setNewCategory('');
      fetchCategories(); // リストを更新
    } catch (err) {
      setError(err instanceof Error ? err.message : '不明なエラーが発生しました');
    } finally {
      setLoading(false);
    }
  };

  // カテゴリを削除
  const deleteCategory = async (id: number) => {
    if (!confirm('本当に削除しますか？')) return;

    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/categories', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'カテゴリの削除に失敗しました');

      fetchCategories(); // リストを更新
    } catch (err) {
      setError(err instanceof Error ? err.message : '不明なエラーが発生しました');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <div className="max-w-xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h1 className="text-2xl font-bold mb-4">カテゴリ管理</h1>

      {/* エラーメッセージ */}
      {error && <p className="text-red-500">{error}</p>}

      {/* カテゴリ追加 */}
      <div className="mb-4 flex gap-2">
        <input
          type="text"
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
          placeholder="新しいカテゴリ名"
          className="border p-2 flex-1 rounded"
        />
        <button
          onClick={addCategory}
          disabled={loading}
          className="bg-blue-500 text-white px-4 py-2 rounded disabled:bg-gray-400"
        >
          追加
        </button>
      </div>

      {/* カテゴリ一覧 */}
      <ul className="divide-y divide-gray-200">
        {loading ? (
          <p>読み込み中...</p>
        ) : categories.length === 0 ? (
          <p>カテゴリがありません</p>
        ) : (
          categories.map((category) => (
            <li key={category.id} className="flex text-black justify-between items-center p-2">
              <span>{category.name}</span>
              <button
                onClick={() => deleteCategory(category.id)}
                className="text-red-500 hover:underline"
              >
                削除
              </button>
            </li>
          ))
        )}
      </ul>
    </div>
  );
}
