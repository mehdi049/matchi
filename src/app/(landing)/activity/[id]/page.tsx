'use client'
import ActivityCardDetails from '@/components/activities/ActivityCardDetails'
import ActivitySidebar from '@/components/activities/ActivitySidebar'
import ErrorMessage from '@/components/message/ErrorMessage'
import IsLoadingSkeleton from '@/components/skeleton/IsLoadingSkeleton'
import { MESSAGES } from '@/const/message'
import useGetActivityById from '@/hooks/activity/useGetActivityById'
import { slugifyString } from '@/utils/string'

export default function Page({ params }: { params: { id: string } }) {
  const { data, isPending, isError } = useGetActivityById(parseInt(params.id))
  if (isPending)
    return (
      <div className="w-full lg:w-3/5">
        <IsLoadingSkeleton type="activity-details-card" />
      </div>
    )
  if (isError)
    return <ErrorMessage isVisible>{MESSAGES.ERROR.GENERAL}</ErrorMessage>

  return (
    <>
      <div className="w-full">
        <ActivityCardDetails activity={data.body} />
      </div>
      <ActivitySidebar
        city={data.body?.city as string}
        activitySlug={data.body?.activity?.slug as string}
      />
    </>
  )
}
