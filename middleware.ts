import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
import { NextResponse } from 'next/server'

import type { NextRequest } from 'next/server'

export async function middleware(req: NextRequest) {
    const res = NextResponse.next()
    const supabase = createMiddlewareClient({ req, res })
    const {
        data: { session },
    } = await supabase.auth.getSession()

    const { pathname } = req.nextUrl

    const isAuthPath =
        pathname.startsWith('/login') ||
        pathname.startsWith('/auth') ||
        pathname.startsWith('/resetPassword')

    if (!session && !isAuthPath && !pathname.startsWith('/_next') && pathname !== '/favicon.ico') {
        const loginUrl = req.nextUrl.clone()
        loginUrl.pathname = '/login'
        return NextResponse.redirect(loginUrl)
    }

    return res
}
