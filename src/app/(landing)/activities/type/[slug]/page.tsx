'use client'
import IsLoadingMessage from '@/components/message/IsLoadingMessage'
import useGetInterestBySlug from '@/hooks/interest/useGetInterestBySlug'
import ActivitiesByType from './ActivitiesByType'
import ErrorMessage from '@/components/message/ErrorMessage'
import InfoMessage from '@/components/message/InfoMessage'

export default function Page({ params }: { params: { slug: string } }) {
  const { data, isPending, isError } = useGetInterestBySlug(params.slug)

  if (isPending) return <IsLoadingMessage type="flat" />
  if (isError)
    return (
      <ErrorMessage isVisible>
        Une erreur est survenu, veuillez réessayer plus tard
      </ErrorMessage>
    )

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
