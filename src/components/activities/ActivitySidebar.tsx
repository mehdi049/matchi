'use client'

import { Card, CardBody } from '@nextui-org/react'
import H2 from '../typography/H2'
import useGetActiveActivities from '@/hooks/activity/useGetActiveActivities'
import IsLoadingSkeleton from '../skeleton/IsLoadingSkeleton'
import ErrorMessage from '../message/ErrorMessage'
import { MESSAGES } from '@/const/message'
import { ActivityCardHorizontal } from './ActivityCardHorizontal'

type ActivitySidebarProps = {
  city: string
  activitySlug: string
}
export default function ActivitySidebar({
  city,
  activitySlug,
}: ActivitySidebarProps) {
  const { data, isPending, isError } = useGetActiveActivities()

  if (isPending)
    return <IsLoadingSkeleton count={6} type="activity-list-horizontal" />
  if (isError)
    return <ErrorMessage isVisible>{MESSAGES.ERROR.GENERAL}</ErrorMessage>

  const filtredByCity = data.body?.filter((activity) => activity.city === city)
  const filtredBySlug = data.body?.filter(
    (activity) => activity.activity?.slug === activitySlug
  )

  return (
    <Card className="w-full md:max-w-sm">
      <CardBody>
        <H2>Autre activités à {city}</H2>
        <div className="mt-4 divide-y">
          {filtredByCity?.slice(0, 3).map((activity) => (
            <ActivityCardHorizontal key={activity.id} activity={activity} />
          ))}
        </div>

        <H2 className="mt-8">Activités similaires</H2>
        <div className="mt-4 divide-y">
          {filtredBySlug?.slice(0, 3).map((activity) => (
            <ActivityCardHorizontal key={activity.id} activity={activity} />
          ))}
        </div>
      </CardBody>
    </Card>
  )
}
