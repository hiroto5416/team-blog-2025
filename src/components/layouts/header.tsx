// components/layouts/header.tsx
import Link from "next/link";

export default function Header() {
  // 仮定: ログイン状態をダミーで管理
  const isLoggedIn = true; // ダミー
  const userImage = "/images/dummy-user.png"; // ログインユーザーのアイコン

  return (
    <header className="w-full bg-[var(--color-card)] text-[var(--color-foreground)] border-b border-[var(--color-muted)]">
      <nav className="w-full flex items-center justify-between px-6 py-4">
        <Link href="/" className="text-2xl font-bold text-[var(--color-accent-cyan)]">
          BugDB
        </Link>
        <div className="flex items-center space-x-6">
          {/* 記事作成リンクだけ残す */}
          <Link
            href="/blog/create"
            className="hover:text-[var(--color-accent-green)] transition-colors"
          >
            Create
          </Link>

          {/* 「記事編集」削除済み */}
          {/* <Link href=\"/blog/edit\" ...> 記事編集</Link> は削除 */}

          {/* マイページのテキストリンクは削除し、アイコンをクリックしたらマイページへ */}
          {isLoggedIn ? (
            <Link href="/mypage">
              <img
                src={userImage}
                alt="User Icon"
                className="w-8 h-8 rounded-full hover:opacity-80 transition"
              />
            </Link>
          ) : (
            <Link
              href="/auth"
              className="hover:text-[var(--color-accent-green)] transition-colors"
            >
              ログイン
            </Link>
          )}
        </div>
      </nav>
    </header>
  );
}
