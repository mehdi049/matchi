import type { Metadata } from 'next'
import './globals.css'
import '@fortawesome/fontawesome-svg-core/styles.css'
import { Providers } from './providers'
import NavbarTop from '@/components/navbar/Navbar'
import Container from '@/components/container/Container'
import Footer from '@/components/footer/Footer'
import { config } from '@fortawesome/fontawesome-svg-core'

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
      <body>
        <Providers>
          <NavbarTop />
          <Container className="mt-20">{children}</Container>
          <Footer />
        </Providers>
      </body>
    </html>
  )
}
