"use client"
import useReceivedRequests from '@/hooks/useReceivedRequests'
import DateFormatter from '@/components/date'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function ReceivedRequestsPage() {
  const { data: requests, error, loading } = useReceivedRequests()
  const supabase = createClientComponentClient()
  const router = useRouter()

  const showToast = (message: string) => {
    alert(message)
  }

  useEffect(() => {
    let subscription: any
    const subscribe = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return
      subscription = supabase
        .from(`requests:receiver_id=eq.${user.id}`)
        .on('INSERT', () => showToast('Nouvelle demande reçue'))
        .subscribe()
    }
    subscribe()
    return () => {
      if (subscription) supabase.removeChannel(subscription)
    }
  }, [])

  const updateStatus = async (id: string, status: 'answered' | 'done') => {
    await supabase.from('requests').update({ status }).eq('id', id)
    router.refresh()
  }

  if (loading) return <div>Loading...</div>
  if (error) return <div>Error fetching requests</div>

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Received Requests</h1>
      <table className="min-w-full border border-gray-200">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-2 border">Title</th>
            <th className="px-4 py-2 border">Status</th>
            <th className="px-4 py-2 border">Created At</th>
            <th className="px-4 py-2 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {requests.map((req) => (
            <tr key={req.id}>
              <td className="border px-4 py-2">{req.title}</td>
              <td className="border px-4 py-2">{req.status}</td>
              <td className="border px-4 py-2"><DateFormatter timestamp={req.created_at} /></td>
              <td className="border px-4 py-2 space-x-2">
                <button
                  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-2 py-1"
                  onClick={() => updateStatus(req.id, 'answered')}
                >
                  Answered
                </button>
                <button
                  className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-2 py-1 ml-2"
                  onClick={() => updateStatus(req.id, 'done')}
                >
                  Done
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
