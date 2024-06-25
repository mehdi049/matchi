import NavbarTop from '@/components/navbar/Navbar'
import Container from '@/components/container/Container'
import Footer from '@/components/footer/Footer'
import { UserContextProvider } from '../member/context/UserContext'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <UserContextProvider isPrivate={false}>
      <div>
        <NavbarTop />
        <Container className="mt-10">{children}</Container>
      </div>
      <Footer />
    </UserContextProvider>
  )
}
