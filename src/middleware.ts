import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // ── Payload admin redirect ────────────────────────────────────────────────
  // Send /admin to the custom Studio UI
  if (pathname === '/admin') {
    return NextResponse.redirect(new URL('/studio', request.url));
  }

  if (pathname === '/admin/create-first-user') {
    const loginUrl = new URL('/admin/login', request.url);
    return NextResponse.redirect(loginUrl);
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
  matcher: ['/admin', '/admin/create-first-user', '/studio/:path*'],
};
