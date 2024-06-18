'use client'

import H2 from '@/components/typography/H2'
import { Card, CardBody } from '@nextui-org/react'
import ActivityForm from '@/components/activities/ActivityForm'
import useGetActivityById from '@/hooks/activity/useGetActivityById'
import IsLoadingMessage from '@/components/message/IsLoadingMessage'
import ErrorMessage from '@/components/message/ErrorMessage'
import { MESSAGES } from '@/const/message'

export default function Page({ params }: { params: { id: string } }) {
  const { data, isLoading, isError } = useGetActivityById(parseInt(params.id))

  if (isLoading) return <IsLoadingMessage type="flat" />
  if (isError)
    return (
      <div>
        <ErrorMessage isVisible>{MESSAGES.ERROR.GENERAL}</ErrorMessage>
      </div>
    )

  return (
    <Card className="w-full">
      <CardBody className="flex gap-4 flex-col">
        <H2>Modifier </H2>

        {data?.body && <ActivityForm activity={data.body} />}
      </CardBody>
    </Card>
  )
}
