"use client"
import { useState } from "react"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { useRouter } from "next/navigation"

export default function NewRequest() {
  const supabase = createClientComponentClient()
  const router = useRouter()

  const [title, setTitle] = useState("")
  const [body, setBody] = useState("")
  const [receiverId, setReceiverId] = useState("")

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) {
        alert("Veuillez vous connecter")
        return
      }
      const { error } = await supabase.from('requests').insert({
        title,
        body,
        sender_id: user.id,
        receiver_id: receiverId,
        organization_id: (user as any).user_metadata.org_id,
      })
      if (error) throw error
      alert("Envoyé")
      router.push('/requests/sent')
    } catch (error) {
      console.error(error)
      alert("Une erreur est survenue")
    }
  }

  return (
    <div className="mx-auto max-w-xl px-4 sm:px-6 lg:px-8 pb-16 pt-20">
      <h1 className="text-2xl font-bold mb-4">New Request</h1>
      <form onSubmit={onSubmit} className="space-y-4">
        <div>
          <label htmlFor="title" className="block mb-2 text-sm font-medium text-gray-900">Title</label>
          <input
            type="text"
            id="title"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            value={title}
            onChange={e => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="body" className="block mb-2 text-sm font-medium text-gray-900">Body</label>
          <textarea
            id="body"
            rows={4}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            value={body}
            onChange={e => setBody(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="receiver" className="block mb-2 text-sm font-medium text-gray-900">Receiver ID</label>
          <input
            type="text"
            id="receiver"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            value={receiverId}
            onChange={e => setReceiverId(e.target.value)}
            required
          />
        </div>
        <div className="text-center">
          <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5">
            Envoyer
          </button>
        </div>
      </form>
    </div>
  )
}
