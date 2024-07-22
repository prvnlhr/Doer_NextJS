import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req) {
  const token = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
    cookieName:
      process.env.VERCEL_ENV === "development"
        ? "next-auth.session-token"
        : "__Secure-next-auth.session-token",
  });

  const { pathname } = req.nextUrl;
  console.log("Token:", token);
  console.log("NEXTAUTH_URL", process.env.NEXTAUTH_URL);

  const authPaths = ["/auth/signin", "/auth/verifyotp", "/auth/signup"];

  if (token && authPaths.includes(pathname)) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  if (!token && pathname.startsWith("/user")) {
    return NextResponse.redirect(new URL("/auth/signin", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/user/:path*", "/auth/signin", "/auth/verifyotp", "/auth/signup"],
};
