import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'

// const isProtectedRoute = createRouteMatcher(['/dashboard(.*)', '/admin(.*)'])

export default clerkMiddleware((_,req) => {
  if (req.nextUrl.pathname == '/sign-up') {
    return NextResponse.redirect(new URL('/sign-in', req.nextUrl.origin))
  }
  
})

export const config = {
  matcher: ['/((?!.+.[w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
}
