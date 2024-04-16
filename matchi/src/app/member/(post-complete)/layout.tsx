import type { Metadata } from 'next'
import '@fortawesome/fontawesome-svg-core/styles.css'
import { config } from '@fortawesome/fontawesome-svg-core'
import ActivitySidebar from '@/components/activities/ActivitySidebar'
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
    <div className="flex gap-24">
      <SidebarMember />
      {children}
    </div>
  )
}
