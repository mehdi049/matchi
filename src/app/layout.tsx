import type { Metadata } from 'next'
import { config } from '@fortawesome/fontawesome-svg-core'
import { Providers } from '@/providers/providers'
import { UserContextProvider } from './member/context/UserContext'
import './globals.css'

export const metadata: Metadata = {
  title: 'Matchi',
  description: 'Matchi',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  config.autoAddCss = false
  return (
    <html lang="en">
      <body className="bg-gray-50">
        <Providers>
          <UserContextProvider isPrivate={false}>
            <div className="flex flex-col justify-between gap-4 min-h-screen">
              {children}
            </div>
          </UserContextProvider>
        </Providers>
      </body>
    </html>
  )
}
