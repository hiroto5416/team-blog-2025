// app/clientLayout.tsx
'use client';

import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';

/**
 * グローバルヘッダー＆フッターを含むレイアウト。
 * ここで children を挟み込むことで、
 * すべてのページに共通の枠組みを作る。
 */
export default function ClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <main className="mx-auto w-full max-w-5xl flex-1 px-4 py-8">{children}</main>
      <Footer />
    </>
  );
}
