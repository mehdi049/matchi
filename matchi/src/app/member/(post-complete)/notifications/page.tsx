'use client'

import NotificationList from '@/components/notifications/NotificationList'
import H2 from '@/components/typography/H2'
import { Card, CardBody } from '@nextui-org/react'

export default function Page() {
  return (
    <Card className="w-full">
      <CardBody className="flex gap-4 flex-col">
        <H2>Notifications</H2>

        <NotificationList />
      </CardBody>
    </Card>
  )
}
