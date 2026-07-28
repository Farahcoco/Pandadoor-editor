import { NextResponse } from 'next/server';

const AUTH_COOKIE = 'maomen_access';

function isOpenPath(pathname) {
  return (
    pathname === '/login' ||
    pathname === '/api/login' ||
    pathname === '/api/logout' ||
    pathname.startsWith('/_next/static') ||
    pathname.startsWith('/_next/image') ||
    pathname === '/favicon.ico'
  );
}

function cleanNextPath(request) {
  const { pathname, search } = request.nextUrl;
  const nextPath = `${pathname}${search}`;
  return encodeURIComponent(nextPath);
}

export function middleware(request) {
  const { pathname } = request.nextUrl;

  if (isOpenPath(pathname)) {
    return NextResponse.next();
  }

  const accessToken = process.env.SITE_ACCESS_TOKEN || process.env.SITE_PASSWORD;
  const cookieValue = request.cookies.get(AUTH_COOKIE)?.value;

  if (accessToken && cookieValue === accessToken) {
    return NextResponse.next();
  }

  const loginUrl = new URL('/login', request.url);
  loginUrl.searchParams.set('next', cleanNextPath(request));
  return NextResponse.redirect(loginUrl);
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)']
};
