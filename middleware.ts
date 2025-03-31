import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getToken } from 'next-auth/jwt'
import NextAuth from "next-auth"
import authConfig from "./auth.config"



export async function middleware(request: NextRequest) {
  // Skip auth check for auth-related routes
  if (
    request.nextUrl.pathname.startsWith('/api/auth') ||
    request.nextUrl.pathname.startsWith('/_next') ||
    request.nextUrl.pathname.startsWith('/favicon.ico')
  ) {
    return NextResponse.next()
  }
  
  const token = await getToken({
    req: request,
    secret: process.env.AUTH_SECRET,
  })
  
  const isAuthenticated = !!token
  const isOnDashboard = request.nextUrl.pathname.startsWith('/dashboard')
  
  // Redirect unauthenticated users from dashboard to signin
  if (isOnDashboard && !isAuthenticated) {
    return NextResponse.redirect(new URL('/signin', request.url))
  }
  
  // Allow authenticated users to access dashboard
  return NextResponse.next()
}

// Specify which routes should be protected
export const config = {
  matcher: [
    '/dashboard/:path*',
    '/protected/:path*',
  ]
}
