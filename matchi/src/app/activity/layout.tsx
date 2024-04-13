import type { Metadata } from 'next'
import ActivitySidebar from '@/components/activities/ActivitySidebar'

export const metadata: Metadata = {
  title: 'Matchi',
  description: 'Matchi',
}

export default function ActivityLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className="flex gap-24">
      {children}
      <ActivitySidebar />
    </div>
  )
}
