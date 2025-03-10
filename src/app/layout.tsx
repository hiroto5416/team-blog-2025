// app/layout.tsx
import "./globals.css";
import Header from "@/components/layouts/header";
import Footer from "@/components/layouts/footer";

export const metadata = {
  title: "Team Blog",
  description: "A sample team blog application",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja">
      <body className="bg-[var(--color-background)] text-[var(--color-foreground)] w-full min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 w-full max-w-5xl mx-auto px-4 py-8">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
