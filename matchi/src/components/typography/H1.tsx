'use client'

export type TypographyProps = {
  className?: string
  children: React.ReactNode
}
export default function H1({ children, className }: TypographyProps) {
  return (
    <h1 className={'text-2xl font-bold ' + (className ?? '')}>{children}</h1>
  )
}
