'use client'

import { Card, CardBody } from '@nextui-org/react'
import { MessageProps } from './ErrorMessage'
import { useEffect, useState } from 'react'

const HIDE_DELAY = 5
export default function SuccessMessage({
  children,
  className,
  isVisible = false,
  autoClose = false,
}: MessageProps) {
  const [forceClose, setForceClose] = useState(false)

  useEffect(() => {
    if (autoClose && isVisible)
      setTimeout(() => {
        setForceClose(true)
      }, 1000 * HIDE_DELAY)
    else setForceClose(false)
  }, [autoClose, isVisible])

  return (
    <>
      {isVisible && !forceClose && (
        <Card className={'bg-green-500 rounded-md ' + className}>
          <CardBody>
            <p className="text-white text-sm">{children}</p>
          </CardBody>
        </Card>
      )}
    </>
  )
}
