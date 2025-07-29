"use client"

import SignInForm from '@/components/modal/signinForm'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function LoginPage() {
  const router = useRouter()
  const supabase = createClientComponentClient()

  useEffect(() => {
    const checkSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession()
      if (session) {
        router.replace('/profile')
      }
    }

    checkSession()
  }, [router, supabase])

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4">
      <h1 className="text-2xl font-bold mb-6">Connectez-vous</h1>
      <div className="w-full max-w-md">
        <SignInForm showModal={() => {}} />
      </div>
    </div>
  )
}
