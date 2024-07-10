import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req) {
  const token = await getToken({ req, secret: process.env.AUTH_SECRET });
  const { pathname } = req.nextUrl;

  const authPaths = ["/auth/signin", "/auth/verifyotp", "/auth/signup"];

  if (token && authPaths.includes(pathname)) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  if (!token && pathname.startsWith("/classroom")) {
    return NextResponse.redirect(new URL("/auth/signin", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/classroom", "/auth/signin", "/auth/verifyotp", "/auth/signup"],
};
