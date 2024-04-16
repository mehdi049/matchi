import type { Metadata } from 'next'
import '@fortawesome/fontawesome-svg-core/styles.css'
import { config } from '@fortawesome/fontawesome-svg-core'
import Container from '@/components/container/Container'
import ProfileCompletionProgress from '@/components/profileCompletionProgress/ProfileCompletionProgress'

export const metadata: Metadata = {
  title: 'Matchi',
  description: 'Matchi',
}

export default function MemberLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  config.autoAddCss = false
  return (
    <>
      <Container size="sm">
        <div className="flex gap-4 flex-col">
          <ProfileCompletionProgress />
          {children}
        </div>
      </Container>
    </>
  )
}
