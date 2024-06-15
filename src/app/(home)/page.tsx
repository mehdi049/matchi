'use client'

import IsLoadingMessage from '@/components/message/IsLoadingMessage'
import ActivitiesByType from './ActivitiesByType'
import useGetInterests from '@/hooks/interest/useGetInterests'

export default function Home() {
  const { data, isPending } = useGetInterests()

  if (isPending) return <IsLoadingMessage type="flat" />

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
