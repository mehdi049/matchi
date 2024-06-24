'use client'
import ActivityCardDetails from '@/components/activities/ActivityCardDetails'
import ErrorMessage from '@/components/message/ErrorMessage'
import IsLoadingSkeleton from '@/components/skeleton/IsLoadingSkeleton'
import { MESSAGES } from '@/const/message'
import useGetActivityById from '@/hooks/activity/useGetActivityById'

export default function Page({ params }: { params: { id: string } }) {
  const { data, isPending, isError } = useGetActivityById(parseInt(params.id))
  if (isPending) return <IsLoadingSkeleton type="activity-details-card" />
  if (isError)
    return <ErrorMessage isVisible>{MESSAGES.ERROR.GENERAL}</ErrorMessage>

  return <ActivityCardDetails activity={data.body} />
}
