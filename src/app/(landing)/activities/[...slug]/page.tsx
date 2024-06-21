'use client'

import IsLoadingMessage from '@/components/message/IsLoadingMessage'
import ErrorMessage from '@/components/message/ErrorMessage'
import InfoMessage from '@/components/message/InfoMessage'
import { MESSAGES } from '@/const/message'
import useGetActiveActivities from '@/hooks/activity/useGetActiveActivities'
import ActivityCard from '@/components/activities/ActivitiyCard'
import H2 from '@/components/typography/H2'
import { AddedActivityResponse } from '@/types/AddedActivityResponse'
import {
  capitalizeFirstLetter,
  slugifyString,
  unSlugifyString,
} from '@/utils/string'
import IsLoadingSkeleton from '@/components/skeleton/IsLoadingSkeleton'

export default function Page({ params }: { params: { slug: string[] } }) {
  const city = slugifyString(params.slug[0])
  const activitySlug = slugifyString(params.slug[1])
  const date = slugifyString(params.slug[2])

  const { data, isPending, isError } = useGetActiveActivities()
  let filteredData: AddedActivityResponse[] | undefined

  if (data && data.body) {
    filteredData = data.body

    if (city && city !== 'all')
      filteredData = filteredData.filter(
        (activity) => slugifyString(activity.city) == city
      )
    if (activitySlug && activitySlug !== 'all')
      filteredData = filteredData.filter(
        (activity) => slugifyString(activity.activity?.slug) == activitySlug
      )

    if (date) {
      filteredData = filteredData.filter(
        (activity) => new Date(activity.date) >= new Date(date)
      )
    }
  }

  if (isPending) return <IsLoadingSkeleton count={8} type="activity-list" />
  if (isError)
    return <ErrorMessage isVisible>{MESSAGES.ERROR.GENERAL}</ErrorMessage>

  return (
    <>
      <div className="flex justify-between gap-4 items-start mt-8 mb-4">
        <H2>
          {city !== 'all' ? capitalizeFirstLetter(unSlugifyString(city)) : ''}{' '}
          {activitySlug && activitySlug !== 'all' && (
            <>/ {capitalizeFirstLetter(unSlugifyString(activitySlug))}</>
          )}{' '}
          {date && <span className="text-xs text-gray-400">/ {date}</span>}
        </H2>
      </div>

      {filteredData && filteredData.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
          {filteredData.map((activity, key) => {
            return (
              <div key={key}>
                <ActivityCard activity={activity} />
              </div>
            )
          })}
        </div>
      ) : (
        <InfoMessage>
          <p>Pas d&apos;activités trouvés en ce moment.</p>
        </InfoMessage>
      )}
      {/*data && data.body ? (
        <div className="flex flex-col gap-16">
          <ActivitiesByType activityType={data?.body} />
        </div>
      ) : (
        <InfoMessage>
          <p>Activité introuvable.</p>
        </InfoMessage>
      )*/}
    </>
  )
}
