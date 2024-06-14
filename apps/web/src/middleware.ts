import { type NextRequest, NextResponse } from 'next/server'

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  const response = NextResponse.next()

  if (pathname.startsWith('/org')) {
    const slug = pathname.split('/')[2]

    response.cookies.set('organization_slug', slug)
  } else {
    response.cookies.delete('organization_slug')
  }

  return response
}
