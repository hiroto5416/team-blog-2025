// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const supabase = createMiddlewareClient({ req, res });

  // ユーザー情報を取得
  const { data } = await supabase.auth.getUser();
  const isAuthenticated = !!data.user;

  // 保護したいページのリスト
  const protectedRoutes = ["/profile", "/articlecreate"];

  // 認証が必要なページで未認証ユーザーがアクセスした場合、サインインページにリダイレクト
  if (!isAuthenticated && protectedRoutes.includes(req.nextUrl.pathname)) {
    return NextResponse.redirect(new URL("/auth/signin", req.url));
  }

  return res;
}

export const config = {
  matcher: ["/profile", "/articlecreate"], // 保護したいページ
};
