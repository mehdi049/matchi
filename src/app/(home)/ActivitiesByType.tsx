'use client'

import { Button, Link } from '@nextui-org/react'
import useGetActiveActivitiesByType from '@/hooks/activity/useGetActiveActivitiesByType'
import IsLoadingMessage from '@/components/message/IsLoadingMessage'
import ErrorMessage from '@/components/message/ErrorMessage'
import H1 from '@/components/typography/H1'
import ActivityCard from '@/components/activities/ActivitiyCard'
import { ActivityResponse } from '@/types/ActivityResponse'
import { MESSAGES } from '@/const/message'
import { ROUTES } from '@/routes'

type ActivitiesProps = {
  activityType: ActivityResponse
}
export default function ActivitiesByType({ activityType }: ActivitiesProps) {
  const { data, isPending, isError } = useGetActiveActivitiesByType(
    activityType.id
  )
  if (isPending) return <IsLoadingMessage type="flat" />
  if (isError)
    return <ErrorMessage isVisible>{MESSAGES.ERROR.GENERAL}</ErrorMessage>

  return (
    <>
      {data?.body && data?.body?.length > 0 && (
        <div>
          <div className="flex justify-between gap-4 items-start mt-8">
            <H1 className="mb-4">{activityType.name}</H1>

            {data?.body && data?.body?.length > 0 && activityType.slug && (
              <Button
                as={Link}
                href={ROUTES.ACTIVITIES_SEARCH(
                  'all',
                  activityType.slug.toLowerCase()
                )}
                color="primary"
                variant="flat"
              >
                Afficher tous les activités de {activityType.name}
              </Button>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
            {data?.body?.map((activity, key) => {
              return (
                <div key={key}>
                  <ActivityCard activity={activity} />
                </div>
              )
            })}
          </div>
        </div>
      )}
    </>
  )
}
