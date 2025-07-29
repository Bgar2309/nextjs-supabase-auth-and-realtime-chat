"use client"

import SignInForm from '@/components/modal/signinForm'
import { createBrowserSupabaseClient } from '@supabase/auth-helpers-nextjs'
import { useRouter } from 'next/navigation'
import { useEffect, useRef } from 'react'

export default function LoginPage() {
  const router = useRouter()
  const supabaseRef = useRef(createBrowserSupabaseClient())

  useEffect(() => {
    const checkSession = async () => {
      const {
        data: { session },
      } = await supabaseRef.current.auth.getSession()
      if (session) {
        router.replace('/profile')
      }
    }

    checkSession()
  }, [router])

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4">
      <h1 className="text-2xl font-bold mb-6">Connectez-vous</h1>
      <div className="w-full max-w-md">
        <SignInForm showModal={() => {}} />
      </div>
    </div>
  )
}
