'use client'
import '@fortawesome/fontawesome-svg-core/styles.css'
import { config } from '@fortawesome/fontawesome-svg-core'
import Container from '@/components/container/Container'
import ProfileCompletionProgress from '@/components/profileCompletionProgress/ProfileCompletionProgress'

import { ProgressContextProvider } from './context/progressContext'

export default function MemberCompleteProfileLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  config.autoAddCss = false

  return (
    <ProgressContextProvider>
      <Container size="sm">
        <div className="flex gap-4 flex-col">
          <ProfileCompletionProgress />
          {children}
        </div>
      </Container>
    </ProgressContextProvider>
  )
}
