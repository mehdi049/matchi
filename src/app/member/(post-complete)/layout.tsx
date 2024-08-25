import type { Metadata } from 'next'
import '@fortawesome/fontawesome-svg-core/styles.css'
import { config } from '@fortawesome/fontawesome-svg-core'
import SidebarMember from '@/components/memberSidebar/Sidebar'
import SidebarMobileMember from '@/components/memberSidebar/SidebarMobile'
import { useContext } from 'react'
import { UserContext } from '../context/UserContext'
import { redirect } from 'next/navigation'
import { ROUTES } from '@/routes'

export const metadata: Metadata = {
  title: 'Matchi',
  description: 'Matchi',
}

export default function MemberPostCompleteProfileLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  config.autoAddCss = false

  return (
    <div className="md:flex gap-12 lg:gap-24 relative">
      <div className="w-full hidden md:block md:max-w-xs">
        <SidebarMember />
      </div>
      <div className="md:hidden w-full fixed left-0 bottom-0 z-50">
        <SidebarMobileMember />
      </div>
      {children}
    </div>
  )
}
