import type { Metadata } from 'next'
import '@fortawesome/fontawesome-svg-core/styles.css'
import { config } from '@fortawesome/fontawesome-svg-core'
import SidebarMember from '@/components/memberSidebar/Sidebar'

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
    <div className="flex gap-24 relative">
      <div className="sticky top-20 w-full max-w-xs">
        <SidebarMember />
      </div>
      {children}
    </div>
  )
}
