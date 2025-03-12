import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabaseClient";

export async function POST() {
  try {
    // サインアウト処理
    const { error } = await supabase.auth.signOut();

    if (error) {
      console.error("サインアウトエラー:", error.message);
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    console.log("サインアウト成功");
    return NextResponse.json({ message: "サインアウト成功" }, { status: 200 });
  } catch (err) {
    console.error("サーバーエラー:", err);
    return NextResponse.json({ error: "サーバーエラーが発生しました。" }, { status: 500 });
  }
}
	