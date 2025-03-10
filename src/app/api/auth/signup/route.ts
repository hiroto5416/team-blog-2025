import { supabase } from "@/lib/supabaseClient";
import { NextResponse, NextRequest } from "next/server";  // NextRequestをインポート

export async function POST(req: NextRequest) {  // reqをNextRequest型に変更
  try {
    const { email, password } = await req.json();
    console.log("Received sign-up request:", { email });

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      console.error("Sign-up error:", error.message);
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    console.log("Sign-up success:", data);
    return NextResponse.json({ user: data.user }, { status: 201 });
  } catch (err) {
    console.error("Unexpected error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
