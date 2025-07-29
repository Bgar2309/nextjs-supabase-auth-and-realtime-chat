import './globals.css'
import SupabaseListener from '@/components/supabaseListener'
import Sidebar from '@/components/sidebar'

export const dynamic = 'force-dynamic'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr">
      <body>
        <div>
          <SupabaseListener />
        </div>
        <Sidebar>
          <main>{children}</main>
        </Sidebar>
      </body>
    </html>
  )
}
