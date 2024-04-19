import type { Metadata } from 'next'
import '@fortawesome/fontawesome-svg-core/styles.css'
import { config } from '@fortawesome/fontawesome-svg-core'
import SidebarMemberMessage from '@/components/messageSidebar/Sidebar'

export const metadata: Metadata = {
  title: 'Matchi',
  description: 'Matchi',
}

export default function MessageLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  config.autoAddCss = false
  return (
    <div className="flex gap-24 relative">
      <div className="hidden md:block w-full max-w-xs">
        <SidebarMemberMessage />
      </div>
      {children}
    </div>
  )
}
