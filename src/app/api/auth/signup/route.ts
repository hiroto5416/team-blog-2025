import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";

export async function POST(req: Request) {
  try {
    const supabase = createServerComponentClient({ cookies });
    const { email, password, name } = await req.json(); // name を受け取る
    console.log("Received sign-up request:", { email, name });

    // ユーザーを認証システムに登録
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
    });

    if (authError) {
      console.error("Sign-up error:", authError.message);
      return NextResponse.json({ error: authError.message }, { status: 400 });
    }

    const userId = authData.user?.id; // ユーザーID (UUID)
    if (!userId) {
      return NextResponse.json({ error: "Failed to get user ID" }, { status: 500 });
    }

    // users テーブルにデータを追加
    const {  error: insertError, status: insertStatus } = await supabase
      .from("users")
      .insert([{ id: userId, email, name }]);

    // エラーの詳細を表示
    if (insertError) {
      console.error("Database insert error:", insertError);
      console.error("Insert status:", insertStatus); // ステータスコードも表示
      return NextResponse.json({ error: insertError.message || insertError, status: insertStatus }, { status: 500 });
    }

    console.log("Sign-up success:", { userId, email, name });
    return NextResponse.json({ user: { id: userId, email, name } }, { status: 201 });

  } catch (err) {
    console.error("Unexpected error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
