'use client';

import { useState } from 'react';

const TestSearchPage = () => {
  const [query, setQuery] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [results, setResults] = useState<{ id: number; title: string }[]>([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    if (!query) {
      setError('検索ワードを入力してください');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      console.log('query: ' + query);
      const res = await fetch(`/api/search?query=${encodeURIComponent(query)}`);
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || '検索に失敗しました');
      }
      setResults(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'エラーが発生しました');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4">
      <h1 className="mb-4 text-xl font-bold">タイトル検索</h1>
      <div className="mb-4 flex gap-2">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="rounded border bg-white p-2 text-black"
          placeholder="検索ワードを入力"
        />
        <button
          onClick={handleSearch}
          className="rounded bg-blue-500 px-4 py-2 text-white"
          disabled={loading}
        >
          {loading ? '検索中...' : '検索'}
        </button>
      </div>
      {error && <p className="text-red-500">{error}</p>}

      {loading && <p>検索中...</p>}

      <ul className="mt-4">
        {results.map((blog) => (
          <li key={blog.id} className="border-b p-2">
            {blog.title}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TestSearchPage;
