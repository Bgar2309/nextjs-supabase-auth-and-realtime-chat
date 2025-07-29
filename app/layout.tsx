import './globals.css'
import SupabaseListener from '@/components/supabaseListener'
import Sidebar from '@/components/sidebar'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ja">
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
