'use client'

import { Card, CardBody } from '@nextui-org/react'

export type MessageProps = {
  className?: string
  children: React.ReactNode
}
export default function ErrorMessage({ children, className }: MessageProps) {
  return (
    <Card className={className}>
      <CardBody>
        <p>{children}</p>
      </CardBody>
    </Card>
  )
}
