"use client"
import useSentRequests from '@/hooks/useSentRequests'
import DateFormatter from '@/components/date'

export default function SentRequestsPage() {
  const requests = useSentRequests()

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Sent Requests</h1>
      <table className="min-w-full border border-gray-200">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-2 border">Title</th>
            <th className="px-4 py-2 border">Status</th>
            <th className="px-4 py-2 border">Created At</th>
          </tr>
        </thead>
        <tbody>
          {requests.map((req) => (
            <tr key={req.id}>
              <td className="border px-4 py-2">{req.title}</td>
              <td className="border px-4 py-2">{req.status}</td>
              <td className="border px-4 py-2"><DateFormatter timestamp={req.created_at} /></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
