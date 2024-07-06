import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

export const config = {
  matcher: [
    /*
     * Match all paths except for:
     * 1. /api routes
     * 2. /_next (Next.js internals)
     * 3. /_static (inside /public)
     * 4. all root files inside /public (e.g. /favicon.ico)
     */
    '/((?!api/|_next/|_static/|_vercel|[\\w-]+\\.\\w+).*)',
  ],
};

export const middleware = async (request: NextRequest) => {
  const url = request.nextUrl;
  const session = await getToken({ req: request });
  if (url.pathname.startsWith('/dashboard')) {
    if (!session) {
      // Redirect to the login page if the user is not authenticated
      const loginUrl = new URL('/did/verify', request.url);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
};
