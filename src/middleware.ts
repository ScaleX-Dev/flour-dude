import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // ── Payload admin redirect ────────────────────────────────────────────────
  // Send all /admin routes to the custom Studio UI
  if (pathname === '/admin' || pathname.startsWith('/admin/')) {
    const targetPath =
      pathname === '/admin' || pathname === '/admin/create-first-user' || pathname === '/admin/login'
        ? '/studio/login'
        : pathname.replace(/^\/admin/, '/studio');

    const redirectUrl = new URL(targetPath, request.url);
    redirectUrl.search = request.nextUrl.search;
    return NextResponse.redirect(redirectUrl);
  }

  // ── Studio auth guard ─────────────────────────────────────────────────────
  // Protect all /studio/* routes except /studio/login
  if (pathname.startsWith('/studio') && !pathname.startsWith('/studio/login')) {
    const token =
      request.cookies.get('payload-token')?.value ??
      request.cookies.get('payload_token')?.value;

    if (!token) {
      const loginUrl = new URL('/studio/login', request.url);
      loginUrl.searchParams.set('next', pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*', '/studio/:path*'],
};
