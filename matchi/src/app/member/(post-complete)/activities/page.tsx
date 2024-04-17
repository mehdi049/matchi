'use client'

import H2 from '@/components/typography/H2'
import { Button, Card, CardBody, Link, Tab, Tabs } from '@nextui-org/react'

export default function Page() {
  return (
    <Card className="w-full">
      <CardBody className="flex gap-4 flex-col">
        <div className="flex gap-2 justify-between items-center">
          <H2>Mes activités</H2>
          <Button
            as={Link}
            href="/member/activities/add"
            variant="ghost"
            color="secondary"
            size="sm"
          >
            Créer une activité
          </Button>
        </div>

        <div className="flex w-full flex-col">
          <Tabs aria-label="Options" size="lg">
            <Tab key="hosting" title="Que j'ai créé"></Tab>
            <Tab key="attending" title="Que je vais assiter"></Tab>
            <Tab key="past" title="Anciennes"></Tab>
          </Tabs>
        </div>
      </CardBody>
    </Card>
  )
}
