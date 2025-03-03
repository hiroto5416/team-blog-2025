import { NextRequest, NextResponse } from "next/server";
import { supabase } from "./lib/supabaseClient";

export default async function middleware(req: NextRequest) { // ✅ default を追加
  const { data: session } = await supabase.auth.getSession();

  if (!session) {
    return NextResponse.redirect(new URL("/auth/signin", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*"], 
};
