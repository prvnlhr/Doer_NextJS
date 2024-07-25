import { NextResponse } from "next/server";
import NextAuth from "next-auth";
import { authConfig } from "./auth.config";

const { auth } = NextAuth(authConfig);

export default auth((req) => {
  const { nextUrl } = req;
  const pathname = nextUrl.pathname;
  console.log(req.auth);
  const isLoggedIn = !!req.auth;
  const userRole = req.auth?.user?.role;

  const authPaths = ["/auth/signin", "/auth/verifyotp", "/auth/signup"];
  const adminPaths = ["/admin", "/admin/:path*"];
  const userPaths = ["/user/:path*"];

  // console.log(pathname, userRole, isLoggedIn);

  // If the user is logged in and trying to access auth pages, redirect to home
  if (isLoggedIn && authPaths.includes(pathname)) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  // If the user is not logged in and trying to access user pages, redirect to sign in
  if (
    !isLoggedIn &&
    userPaths.some((path) => pathname.startsWith(path.replace(":path*", "")))
  ) {
    return NextResponse.redirect(new URL("/auth/signin", req.url));
  }

  // If the user is not logged in and trying to access admin pages, redirect to admin sign in
  if (
    !isLoggedIn &&
    adminPaths.some((path) => pathname.startsWith(path.replace(":path*", "")))
  ) {
    return NextResponse.redirect(new URL("/auth/admin/signin", req.url));
  }

  // If the user is logged in but not an admin and trying to access admin pages, redirect to admin sign in
  if (
    isLoggedIn &&
    adminPaths.some((path) =>
      pathname.startsWith(path.replace(":path*", ""))
    ) &&
    userRole !== "admin"
  ) {
    return NextResponse.redirect(new URL("/auth/admin/signin", req.url));
  }

  return NextResponse.next();
});

export const config = {
  matcher: [
    "/user/:path*",
    "/auth/signin",
    "/auth/verifyotp",
    "/auth/signup",
    "/admin/:path*",
  ],
};
