'use client'

import { ProgressContext } from '@/app/member/complete/context/progressContext'
import { Card, CardBody, Progress } from '@nextui-org/react'
import { useContext } from 'react'

export default function ProfileCompletionProgress() {
  const context = useContext(ProgressContext)
  return (
    <Card>
      <CardBody>
        <Progress
          aria-label="Complete"
          size="sm"
          value={context.progress}
          color="primary"
          showValueLabel={true}
          label="Compléter mon profile"
          className="w-full"
        />
      </CardBody>
    </Card>
  )
}
