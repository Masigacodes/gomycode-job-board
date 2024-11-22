import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  if (!token) {
    return NextResponse.redirect(new URL('/login', req.url)); // Redirect to login if not authenticated
  }

  if (req.nextUrl.pathname.startsWith('/admin') && token.role !== 'admin') {
    return NextResponse.redirect(new URL('/', req.url)); // Redirect non-admin users to home
  }

  return NextResponse.next(); // Allow access for admins
}

export const config = {
  matcher: ['/admin/:path*'], // Apply middleware to admin routes
};
