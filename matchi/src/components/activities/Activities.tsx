'use client'

import { Link } from '@nextui-org/react'
import H1 from '../typography/H1'
import ActivityCard from './ActivitiyCard'
import InfoMessage from '../message/InfoMessage'
import H3 from '../typography/H3'

type ActivitiesProps = {
  activityName?: string
  city?: string
}
export default function Activities({ activityName, city }: ActivitiesProps) {
  const getRandomInt = (max: number) => {
    return Math.floor(Math.random() * max)
  }
  const randomNumber = getRandomInt(8)

  return (
    <>
      <div>
        <div className="flex justify-between gap-4 items-start">
          {activityName && city ? (
            <div className="flex items-end gap-2 mb-4">
              <H1>{city}</H1>
              <H3>/ {activityName}</H3>
            </div>
          ) : activityName ? (
            <H1 className="mb-4">{activityName}</H1>
          ) : (
            <H1 className="mb-4">{city}</H1>
          )}

          {randomNumber > 0 && (
            <Link
              href={'/activities/' + activityName?.toLowerCase() + '/tunis'}
              underline="hover"
              color="primary"
            >
              Afficher tous les évenements
            </Link>
          )}
        </div>

        {randomNumber === 0 ? (
          <InfoMessage>
            <p>Pas d&apos;évenements trouvés en ce moment.</p>
          </InfoMessage>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
            {[...Array(randomNumber).keys()].map((x, key) => {
              return (
                <div key={key}>
                  <ActivityCard />
                </div>
              )
            })}
          </div>
        )}
      </div>
    </>
  )
}
