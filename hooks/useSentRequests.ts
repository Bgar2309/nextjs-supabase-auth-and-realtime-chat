import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabaseClient'

export default function useSentRequests() {
  const [requests, setRequests] = useState<any[]>([])

  useEffect(() => {
    const fetchRequests = async () => {
      if (!supabase) {
        setRequests([])
        return
      }
      const {
        data: { user },
      } = await supabase.auth.getUser()
      if (!user) return
      const { data, error } = await supabase
        .from('requests')
        .select('*')
        .eq('sender_id', user.id)
      if (error) {
        console.error(error)
        return
      }
      if (data) {
        setRequests(data)
      }
    }
    fetchRequests()
  }, [])

  return requests
}
