import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
    const requestUrl = new URL(request.url)

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

    if (!supabaseUrl || !supabaseKey) {
        return NextResponse.json(
            { error: 'Supabase credentials missing' },
            { status: 500 }
        )
    }

    const supabase = createRouteHandlerClient({ cookies })

    await supabase.auth.signOut()

    return NextResponse.redirect(requestUrl.origin + '/', {
        status: 301,
    })
}