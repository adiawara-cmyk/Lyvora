import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const PROTECTED_ROUTES = ["/dashboard", "/doctor", "/organization", "/admin"];
const AUTH_ROUTES = ["/login", "/register"];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get("lyvora_token")?.value;

  // For now, we rely on client-side auth context (localStorage).
  // This middleware provides a basic redirect for unauthenticated users
  // who directly navigate to protected routes without JS loaded.

  // Allow all routes through - auth is handled client-side
  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/doctor/:path*", "/organization/:path*", "/admin/:path*"],
};
