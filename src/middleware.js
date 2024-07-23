import { NextResponse } from "next/server";
import NextAuth from "next-auth";
import { authConfig } from "./auth.config";

const { auth } = NextAuth(authConfig);

export default auth((req) => {
  const { nextUrl } = req;
  const pathname = nextUrl.pathname;

  console.log("AUTH_SECRET", process.env.AUTH_SECRET);
  console.log("AUTH_SECRET", process.env.AUTH_URL);
  console.log("NEXT_DEMO_LOGIN_ID", process.env.NEXT_DEMO_LOGIN_ID);

  const isLoggedIn = !!req.auth;

  console.log("isLoggedIn", isLoggedIn);
  const authPaths = ["/auth/signin", "/auth/verifyotp", "/auth/signup"];

  if (isLoggedIn && authPaths.includes(pathname)) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  if (!isLoggedIn && pathname.startsWith("/user")) {
    return NextResponse.redirect(new URL("/auth/signin", req.url));
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/user/:path*", "/auth/signin", "/auth/verifyotp", "/auth/signup"],
};
