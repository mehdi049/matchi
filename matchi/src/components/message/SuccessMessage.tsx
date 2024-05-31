'use client'

import { Card, CardBody } from '@nextui-org/react'
import { MessageProps } from './ErrorMessage'

export default function SuccessMessage({
  children,
  className,
  isVisible = false,
}: MessageProps) {
  return (
    <>
      {isVisible && (
        <Card className={'bg-green-500 rounded-md ' + className}>
          <CardBody>
            <p className="text-white text-sm">{children}</p>
          </CardBody>
        </Card>
      )}
    </>
  )
}
