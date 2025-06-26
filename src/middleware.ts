import { NextRequest, NextResponse } from "next/server";

const staticFileExtensions = [
  ".png",
  ".jpg",
  ".jpeg",
  ".webp",
  ".svg",
  ".ico",
  ".woff",
  ".woff2",
  ".ttf",
  ".eot",
];

const isStaticAsset = (pathname: string): boolean => {
  return (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/fonts") ||
    pathname === "/favicon.ico" ||
    staticFileExtensions.some((ext) => pathname.endsWith(ext))
  );
};

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (isStaticAsset(pathname)) {
    return NextResponse.next();
  }

  const accessToken = req.cookies.get("accessToken")?.value;
  const isAuthenticated = !!accessToken;

  // 로그인 필요한 경로
  const protectedPaths = ["/my-page", "/write"];
  const isProtectedPath = protectedPaths.some((path) =>
    pathname.startsWith(path)
  );

  // 로그인 안한 사람만
  const authPaths = ["/login", "/signup"];
  const isAuthPath = authPaths.some((path) => pathname.startsWith(path));

  if (isAuthenticated && isAuthPath) {
    return NextResponse.redirect(new URL("/main", req.url));
  }

  if (!isAuthenticated && isProtectedPath) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: "/:path*",
};
