'use client'

import { Card, CardBody } from '@nextui-org/react'

export type MessageProps = {
  isVisible?: boolean
  className?: string
  children: React.ReactNode
}
export default function ErrorMessage({
  children,
  className,
  isVisible = false,
}: MessageProps) {
  return (
    <>
      {isVisible && (
        <Card className={'bg-red-500 rounded-md ' + className}>
          <CardBody>
            <p className="text-white text-sm">{children}</p>
          </CardBody>
        </Card>
      )}
    </>
  )
}
