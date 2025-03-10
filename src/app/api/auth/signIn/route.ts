import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabaseClient";

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();
    console.log("サインインリクエスト:", { email });

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      console.error("サインインエラー:", error.message);
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    console.log("サインイン成功:", data);
    return NextResponse.json({ user: data.user, session: data.session }, { status: 200 });
  } catch (err) {
    console.error("サーバーエラー:", err);
    return NextResponse.json({ error: "サーバーエラーが発生しました。" }, { status: 500 });
  }
}
