// middleware.ts
import { ratelimit } from "./app/lib/rateLimiter";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  const ip = req.ip ?? "anonymous";
  const { success } = await ratelimit.limit(ip);

  if (!success) {
    return new NextResponse("Too Many Requests", { status: 429 });
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/api/send-otp"], // protect specific API paths
};
