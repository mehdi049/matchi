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
              profile?.addedActivities?.map((activity) => {
                return (
                  <div
                    key={activity.id}
                    className="flex gap-2 py-2 justify-between hover:bg-gray-100 duration-100 cursor-pointer px-1.5"
                    onClick={() => {
                      router.push(ROUTES.ACTIVITY(activity.id as number))
                    }}
                  >
                    <div className="lg:w-1/2">
                      <User
                        name={profile.name}
                        description={
                          activity.attendees?.length + ' participants'
                        }
                        avatarProps={{
                          src: profile.image,
                        }}
                        className="flex md:hidden lg:flex justify-start"
                      />
                    </div>
                    <div>
                      <p className="text-sm">
                        <strong>{activity.activity?.name}</strong> -{' '}
                        {activity.place}
                      </p>
                      <p className="text-xs text-gray-400">
                        {fullDate(activity.date)}
                      </p>
                    </div>
                  </div>
                )
              })
            ) : (
              <InfoMessage>Aucune activités créés</InfoMessage>
            )}
          </div>
        </CardBody>
      </Card>
    </div>
  )
}
