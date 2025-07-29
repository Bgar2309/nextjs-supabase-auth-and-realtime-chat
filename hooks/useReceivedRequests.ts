import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabaseClient'

export default function useReceivedRequests() {
  const [data, setData] = useState<any[]>([])
  const [error, setError] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchRequests = async () => {
      setLoading(true)
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) {
        setLoading(false)
        return
      }

      const { data, error } = await supabase
        .from('requests')
        .select('*')
        .eq('receiver_id', user.id)

      if (error) {
        setError(error)
      } else if (data) {
        setData(data)
      }
      setLoading(false)
    }

    fetchRequests()
  }, [])

  return { data, error, loading }
}
