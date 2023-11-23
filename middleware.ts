import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {

  const path = request.nextUrl.pathname;
  const isLoginPage = path === '/login';
  const isProfilePage = path === '/profile';
  const token = request.cookies.get('token')?.value || '';

  if (!token && isProfilePage) {
    // User is not logged in and trying to access the profile page
    return NextResponse.redirect(new URL('/login', request.nextUrl));
  }

  if (token && isLoginPage) {
    // User is logged in and trying to access the login page
    return NextResponse.redirect(new URL('/', request.nextUrl));
  }

  return null;
}

export const config = {
  matcher: ['/', '/profile', '/login', '/signup'],
};
