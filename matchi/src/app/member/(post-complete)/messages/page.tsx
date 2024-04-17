'use client'

import H2 from '@/components/typography/H2'
import { Card, CardBody, Tab, Tabs } from '@nextui-org/react'

export default function Page() {
  return (
    <Card className="w-full">
      <CardBody className="flex gap-4 flex-col">
        <H2>Mes messages</H2>

        <div className="flex w-full flex-col">
          <Tabs aria-label="Options" size="lg">
            <Tab key="received" title="Reçu"></Tab>
            <Tab key="sent" title="Envoyé"></Tab>
          </Tabs>
        </div>
      </CardBody>
    </Card>
  )
}
