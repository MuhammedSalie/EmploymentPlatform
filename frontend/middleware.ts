import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

// Define which routes require authentication
const protectedRoutes = ["/dashboard", "/applications", "/profile", "/jobs/apply"]

// Define public routes that should redirect to dashboard if already authenticated
const authRoutes = ["/signin", "/signup", "/forgot-password"]

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Check if the user is authenticated by looking for the authentication cookie
  // In a real implementation, you would verify the JWT token
  const isAuthenticated = request.cookies.has("amplify.authenticatorAuthState")

  // If accessing a protected route without authentication
  if (protectedRoutes.some((route) => pathname.startsWith(route)) && !isAuthenticated) {
    const url = new URL("/signin", request.url)
    url.searchParams.set("from", pathname)
    return NextResponse.redirect(url)
  }

  // If accessing auth routes while already authenticated
  if (authRoutes.some((route) => pathname.startsWith(route)) && isAuthenticated) {
    return NextResponse.redirect(new URL("/dashboard", request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public (public files)
     */
    "/((?!_next/static|_next/image|favicon.ico|public).*)",
  ],
}
