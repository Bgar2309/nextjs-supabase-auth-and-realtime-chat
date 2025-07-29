import Link from 'next/link'

export default function Sidebar({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen">
      <aside className="w-60 bg-gray-100 p-4 space-y-2">
        <Link href="/requests/sent" className="block p-2 rounded hover:bg-gray-200">
          Mes demandes
        </Link>
        <Link href="/requests/received" className="block p-2 rounded hover:bg-gray-200">
          À faire
        </Link>
      </aside>
      <div className="flex-1 p-4">
        {children}
      </div>
    </div>
  )
}
