'use client'

import { Button, Link } from '@nextui-org/react'
import useGetActiveActivitiesByType from '@/hooks/activity/useGetActiveActivitiesByType'
import ErrorMessage from '@/components/message/ErrorMessage'
import H1 from '@/components/typography/H1'
import ActivityCard from '@/components/activities/ActivitiyCard'
import { ActivityResponse } from '@/types/ActivityResponse'
import { MESSAGES } from '@/const/message'
import { ROUTES } from '@/routes'
import IsLoadingSkeleton from '@/components/skeleton/IsLoadingSkeleton'
import useMediaQuery from '@/hooks/useMediaQuery'

type ActivitiesProps = {
  activityType: ActivityResponse
}
export default function ActivitiesByType({ activityType }: ActivitiesProps) {
  const [isMobile] = useMediaQuery('mobile')
  const { data, isPending, isError } = useGetActiveActivitiesByType(
    activityType.id
  )
  if (isPending) return <IsLoadingSkeleton type="activity-list" count={4} />
  if (isError)
    return <ErrorMessage isVisible>{MESSAGES.ERROR.GENERAL}</ErrorMessage>

  return (
    <>
      {data?.body && data?.body?.length > 0 && (
        <div>
          <div className="flex justify-between items-start mt-8">
            <H1 className="mb-4">{activityType.name}</H1>

            {data?.body && data?.body?.length > 0 && activityType.slug && (
              <Button
                as={Link}
                href={ROUTES.ACTIVITIES_SEARCH(
                  'all',
                  activityType.slug.toLowerCase()
                )}
                color="primary"
                variant="ghost"
                size={isMobile ? 'sm' : 'md'}
              >
                Afficher plus
              </Button>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
            {data?.body?.slice(0, 8).map((activity, key) => {
              return <ActivityCard key={key} activity={activity} />
            })}
          </div>
        </div>
      )}
    </>
  )
}
