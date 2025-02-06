import { NextResponse, NextRequest } from "next/server";
export { default } from "next-auth/middleware";
import { getToken } from "next-auth/jwt";

export const config = {
  matcher: ["/dashboard/:path*", "/sign-in", "/sign-up", "/", "/verify/:path*"],
};

export async function middleware(request: NextRequest) {
  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });
  const url = request.nextUrl; // current URL

  // console.log("Token from getToken:", token);

  if (
    token &&
    (url.pathname.startsWith("/sign-in") ||
      url.pathname.startsWith("/sign-up") ||
      url.pathname.startsWith("/verify"))
    // url.pathname.startsWith("/")
  ) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  if (!token && url.pathname.startsWith("/dashboard")) {
    return NextResponse.redirect(new URL("/sign-in", request.url));
  }

  return NextResponse.next();
}
