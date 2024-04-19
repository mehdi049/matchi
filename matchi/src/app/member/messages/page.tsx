'use client'

import MessageBox from '@/components/messageBox/MessageBox'
import H2 from '@/components/typography/H2'
import { Card, CardBody, Divider } from '@nextui-org/react'

export default function Page() {
  return (
    <Card className="w-full">
      <CardBody className="flex gap-4 flex-col">
        <H2>Mes messages</H2>

        <Divider />
        <MessageBox />
      </CardBody>
    </Card>
  )
}
