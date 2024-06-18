import NavbarTop from '@/components/navbar/Navbar'
import Container from '@/components/container/Container'
import Footer from '@/components/footer/Footer'

import HeroSection from '@/components/heroHome/HeroSection'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <>
      <div>
        <NavbarTop />
        <HeroSection />
        <Container className="mt-10">{children}</Container>
      </div>
      <Footer />
    </>
  )
}
