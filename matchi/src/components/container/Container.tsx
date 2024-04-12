'use client'

type ContainerProps = {
  className?: string
  children: React.ReactNode
}
export default function Container({ children, className }: ContainerProps) {
  return (
    <>
      <div className={'max-w-7xl mx-auto p-4 ' + (className ?? '')}>
        {children}
      </div>
    </>
  )
}
