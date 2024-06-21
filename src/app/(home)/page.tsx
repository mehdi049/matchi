'use client'

import ActivitiesByType from './ActivitiesByType'
import useGetInterests from '@/hooks/interest/useGetInterests'
import IsLoadingSkeleton from '@/components/skeleton/IsLoadingSkeleton'

export default function Home() {
  const { data, isPending } = useGetInterests()

  if (isPending) return <IsLoadingSkeleton type="activity-list" />

  return (
    <>
      <div className="flex flex-col gap-16">
        {data?.body?.map((activityType) => (
          <ActivitiesByType key={activityType.id} activityType={activityType} />
        ))}
      </div>
    </>
  )
}
