'use client'

import H2 from '@/components/typography/H2'
import { Card, CardBody } from '@nextui-org/react'
import ActivityForm from '@/components/activities/ActivityForm'

export default function Page() {
  return (
    <Card className="w-full">
      <CardBody className="flex gap-4 flex-col">
        <H2>Créer une activité</H2>

        <ActivityForm />
      </CardBody>
    </Card>
  )
}
