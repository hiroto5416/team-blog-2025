// app/clientLayout.tsx
"use client";

import Header from "@/components/layout/Header/Header";
import Footer from "@/components/layout/Footer/Footer";

/**
 * グローバルヘッダー＆フッターを含むレイアウト。
 * ここで children を挟み込むことで、
 * すべてのページに共通の枠組みを作る。
 */
export default function ClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <main className="flex-1 w-full max-w-5xl mx-auto px-4 py-8">{children}</main>
      <Footer />
    </>
  );
}
