'use client'

import { Card, CardBody, Progress } from '@nextui-org/react'
import { useEffect, useState } from 'react'

export default function ProfileCompletionProgress() {
  const [value, setValue] = useState(20)

  /*useEffect(() => {
    const interval = setInterval(() => {
      setValue((v) => (v >= 100 ? 0 : v + 10))
    }, 500)

    return () => clearInterval(interval)
  }, [])*/

  return (
    <Card>
      <CardBody>
        <Progress
          aria-label="Complete"
          size="sm"
          value={value}
          color="primary"
          showValueLabel={true}
          label="Compléter mon profile"
          className="w-full"
        />
      </CardBody>
    </Card>
  )
}
