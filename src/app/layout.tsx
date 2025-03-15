// app/layout.tsx (サーバーコンポーネント)
import "./globals.css";
import ClientLayout from "./clientLayout";

export const metadata = {
  title: "Team Blog",
  description: "A sample team blog application",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja">
      <body suppressHydrationWarning>
        {/*
          サーバーコンポーネント上で 
          ClientLayout(クライアントコンポーネント) を呼ぶ
        */}
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
