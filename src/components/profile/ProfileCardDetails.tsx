'use client'

import {
  Image,
  User,
  CardBody,
  Card,
  Chip,
  Divider,
  user,
} from '@nextui-org/react'
import H2 from '../typography/H2'
import H1 from '../typography/H1'
import { useRouter } from 'next/navigation'
import ProfileRating from '../rating/Rating'
import ProfileFeedback from './ProfileFeedback'
import { UserResponse } from '@/types/User'
import { fullDate, getAgeFromBirthdate } from '@/utils/date'
import useGetInterests from '@/hooks/interest/useGetInterests'
import IsLoadingMessage from '../message/IsLoadingMessage'
import { ROUTES } from '@/routes'
import InfoMessage from '../message/InfoMessage'
import { generateImageUrlForUser } from '@/utils/string'
import { ActivityCardHorizontal } from '../activities/ActivityCardHorizontal'

type ProfileProps = {
  profile: UserResponse
}
export default function ProfileCardDetails({ profile }: ProfileProps) {
  const router = useRouter()
  const { data, isLoading } = useGetInterests()

  return (
    <div className="flex flex-wrap md:flex-nowrap gap-4">
      <Card className="w-full md:max-w-xs">
        <CardBody className="flex gap-4 flex-col">
          <Image
            src={generateImageUrlForUser(profile.image, profile?.gender)}
            alt=""
            className="w-full"
          />
          <H1>{profile?.name}</H1>
          <p>{profile?.email}</p>
          <p>{getAgeFromBirthdate(profile.birthDay)} ans</p>
          <p>
            {profile?.city} {profile?.municipality}
          </p>
          <ProfileRating />
          <Divider />
          <p className="text-xs">Participé à 30 évenement(s)</p>
          <p className="text-xs">
            A rejoint Matchi le {fullDate(profile?.createdAt as Date)}
          </p>
        </CardBody>
      </Card>

      <div className="flex flex-col gap-4">
        {profile.interests && profile.interests?.length > 0 && (
          <Card className="w-full">
            <CardBody>
              <H2>Centre d&apos;intérét</H2>
              {isLoading && <IsLoadingMessage type="flat" />}
              {data && (
                <div className="flex gap-1 flex-wrap mt-4">
                  {data.body?.map((interest) => {
                    if (
                      profile?.interests?.find(
                        (i) => i.activityId === interest.id
                      )
                    )
                      return (
                        <Chip key={interest.id} color="primary" variant="solid">
                          {interest.name}
                        </Chip>
                      )
                  })}
                </div>
              )}
            </CardBody>
          </Card>
        )}
        <ProfileFeedback />
      </div>

      <Card className="w-full">
        <CardBody>
          <H2>Evenements organisés</H2>
          <div className="mt-4 divide-y">
            {profile?.addedActivities && profile.addedActivities.length > 0 ? (
              profile?.addedActivities?.map((activity) => (
                <ActivityCardHorizontal key={activity.id} activity={activity} />
              ))
            ) : (
              <InfoMessage>Aucune activités créés</InfoMessage>
            )}
          </div>
        </CardBody>
      </Card>
    </div>
  )
}
