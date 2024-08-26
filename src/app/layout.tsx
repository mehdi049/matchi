import type { Metadata } from 'next'
import { config } from '@fortawesome/fontawesome-svg-core'
import { Providers } from '@/providers/providers'
import './globals.css'

export const metadata: Metadata = {
  title: 'Matchi',
  description: 'Matchi',
  viewport: 'width=device-width, initial-scale=1, maximum-scale=1',
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
          <div className="flex flex-col justify-between gap-4 min-h-screen">
            {children}
          </div>
        </Providers>
      </body>
    </html>
  )
}
