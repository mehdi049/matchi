import type { Metadata } from 'next'
import '../globals.css'
import '@fortawesome/fontawesome-svg-core/styles.css'
import NavbarTop from '@/components/navbar/Navbar'
import Container from '@/components/container/Container'
import Footer from '@/components/footer/Footer'
import { config } from '@fortawesome/fontawesome-svg-core'

import HeroSection from '@/components/heroHome/HeroSection'
import { Providers } from '@/providers/providers'

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
          <NavbarTop />
          <HeroSection />
          <Container className="mt-10">{children}</Container>
          <Footer />
        </Providers>
      </body>
    </html>
  )
}
