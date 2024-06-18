'use client'

import IsLoadingMessage from '@/components/message/IsLoadingMessage'
import useGetInterestBySlug from '@/hooks/interest/useGetInterestBySlug'
import ActivitiesByType from './ActivitiesByType'
import ErrorMessage from '@/components/message/ErrorMessage'
import InfoMessage from '@/components/message/InfoMessage'
import { MESSAGES } from '@/const/message'

export default function Page({ params }: { params: { slug: string } }) {
  const { data, isPending, isError } = useGetInterestBySlug(params.slug)

  if (isPending) return <IsLoadingMessage type="flat" />
  if (isError)
    return <ErrorMessage isVisible>{MESSAGES.ERROR.GENERAL}</ErrorMessage>

  return (
    <>
      {data && data.body ? (
        <div className="flex flex-col gap-16">
          <ActivitiesByType activityType={data?.body} />
        </div>
      ) : (
        <InfoMessage>
          <p>Activité introuvable.</p>
        </InfoMessage>
      )}
    </>
  )
}
