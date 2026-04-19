import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname === '/admin') {
    const adminCollectionUrl = new URL('/admin/collections/cake-portfolio-items', request.url);
    return NextResponse.redirect(adminCollectionUrl);
  }

  if (pathname === '/admin/create-first-user') {
    const loginUrl = new URL('/admin/login', request.url);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin', '/admin/create-first-user'],
};
