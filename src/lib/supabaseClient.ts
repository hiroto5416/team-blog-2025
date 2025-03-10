// lib/supabaseClient.ts
import { createClient } from "@supabase/supabase-js";
import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

// クライアントサイド用の supabase
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// サーバーサイド用の supabase (middleware用)
export const createServerSupabaseClient = (req: any, res: any) =>
  createMiddlewareClient({ req, res });
