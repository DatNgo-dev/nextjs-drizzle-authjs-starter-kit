import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";
import { NextResponse } from "next/server";

import type { NextRequest } from "next/server";
import type { Database } from "@/lib/database.types";

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const pathname = req.nextUrl.pathname;

  const supabase = createMiddlewareClient<Database>({ req, res });
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session && pathname === "/") {
    const url = new URL(req.url);
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }

  return res;
}
