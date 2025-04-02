// src/app/api/auth/signout/route.ts
import { NextResponse } from "next/server";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

// キャッシュ無効化
export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  // ❌ cookies() を実行するのではなく
  // ✅ 関数 cookies をそのまま渡す（重要！）
  const supabase = createRouteHandlerClient({ cookies });

  await supabase.auth.signOut();

  // 絶対URLでリダイレクト
  return NextResponse.redirect(new URL("/", request.url));
}

export async function GET() {
  return new Response("Method Not Allowed", { status: 405 });
}
