import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req) {
  const token = await getToken({
    req,
    secret: "fTAYuT04CuTa+ZSYxs5AYoIAcvKf0xy9Pkoj/WG60mk=",
  });
  const { pathname } = req.nextUrl;
  console.log("Pathname:", pathname);
  console.log("Token:", token);

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
