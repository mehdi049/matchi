import type { Metadata } from 'next'

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
    <div className="flex flex-wrap md:flex-nowrap gap-12 lg:gap-24">
      {children}
    </div>
  )
}
