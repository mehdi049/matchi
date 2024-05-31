'use client'

import { Card, CardBody } from '@nextui-org/react'
import { MessageProps } from './ErrorMessage'

export default function InfoMessage({ children, className }: MessageProps) {
  return (
    <Card className={className}>
      <CardBody>
        <p>{children}</p>
      </CardBody>
    </Card>
  )
}
