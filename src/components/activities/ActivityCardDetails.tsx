'use client'

import {
  Image,
  Avatar,
  Chip,
  AvatarGroup,
  Button,
  Divider,
  Link,
  User,
  CardBody,
  Card,
} from '@nextui-org/react'
import H2 from '../typography/H2'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faCalendarDay,
  faClock,
  faLocationDot,
  faMoneyCheckDollar,
} from '@fortawesome/free-solid-svg-icons'
import { useRouter } from 'next/navigation'
import { AddedActivityResponse } from '@/types/AddedActivityResponse'
import { ROUTES } from '@/routes'
import {
  extractHourFromDate,
  extractMinuteFromDate,
  fullDate,
} from '@/utils/date'
import { CTAJoin } from './CTAJoin'
import { UserContext } from '@/app/member/context/UserContext'
import { useContext } from 'react'

export type ActivityProps = {
  activity?: AddedActivityResponse
}
export default function ActivityCardDetails({ activity }: ActivityProps) {
  const router = useRouter()
  const { user } = useContext(UserContext)

  const isMyActivity = activity?.createdBy?.id === user?.id

  return (
    <div>
      {activity && (
        <Card className="w-full">
          <CardBody>
            <div className="flex flex-wrap gap-4">
              <div className="grow">
                <User
                  name={activity?.createdBy?.name}
                  description="Organizateur"
                  avatarProps={{
                    src: activity?.createdBy?.image,
                  }}
                  className="cursor-pointer"
                  onClick={() =>
                    router.push(
                      ROUTES.PROFILE(activity?.createdBy?.id as string)
                    )
                  }
                />
                <div className="pl-12">
                  <Chip color="primary" size="sm" variant="flat">
                    {activity?.type}
                  </Chip>
                </div>
              </div>
              <div className="flex gap-1 flex-col">
                <CTAJoin activity={activity} />
                {!isMyActivity && (
                  <Button
                    onClick={() => {
                      router.push(ROUTES.PROFILES)
                    }}
                    size="sm"
                    variant="flat"
                    color="primary"
                  >
                    Inviter des participants
                  </Button>
                )}
              </div>
            </div>
            <Divider className="my-4" />

            <div className="flex items-center flex-wrap gap-4 mb-4">
              <div>
                <Image
                  alt={activity?.activity?.name}
                  className="object-cover rounded-xl w-full max-w-xs"
                  src={activity?.activity?.image}
                />
              </div>

              <div>
                <H2>
                  <strong>{activity.activity?.name}</strong>
                </H2>
                <div className="flex flex-col gap-2">
                  <p className="mt-4 flex gap-2 items-center">
                    <FontAwesomeIcon icon={faLocationDot} /> {activity.city},{' '}
                    {activity?.place}
                  </p>
                  <p className="flex gap-2 items-center">
                    <FontAwesomeIcon icon={faCalendarDay} />{' '}
                    {fullDate(activity?.date as Date)}
                  </p>
                  <p className="flex gap-2 items-center">
                    <FontAwesomeIcon icon={faClock} />{' '}
                    {`${extractHourFromDate(
                      activity?.start as Date
                    )}:${extractMinuteFromDate(activity?.start as Date)}h`}{' '}
                    -{' '}
                    {`${extractHourFromDate(
                      activity?.end as Date
                    )}:${extractMinuteFromDate(activity?.end as Date)}h`}
                  </p>
                  <p className="flex gap-2 items-center">
                    <FontAwesomeIcon icon={faMoneyCheckDollar} />{' '}
                    {activity?.price
                      ? activity.price + ' ' + activity.currency
                      : 'Gratuit'}
                  </p>
                </div>
                {activity?.googleMap && (
                  <Link
                    href={activity.googleMap}
                    target="_blank"
                    underline="always"
                    size="sm"
                    className="mt-4"
                  >
                    Voir localisation
                  </Link>
                )}
              </div>
            </div>

            {activity?.description && (
              <>
                <H2 className="mt-4">Plus de detail</H2>
                <p className="mt-2">{activity?.description}</p>
              </>
            )}

            <p className="text-xs mt-4 text-gray-600">
              Publié le {fullDate(activity?.createdAt as Date)},{' '}
              {`${extractHourFromDate(
                activity?.createdAt as Date
              )}:${extractMinuteFromDate(activity?.createdAt as Date)}h`}
            </p>

            <Divider className="my-4" />

            <H2>
              {activity?.attendees?.length}
              {activity?.maxAttendees && activity?.maxAttendees > 0 ? (
                <>/ {activity.maxAttendees}</>
              ) : (
                <></>
              )}{' '}
              Participant(s)
            </H2>
            {activity?.attendees && activity?.attendees?.length > 0 && (
              <AvatarGroup size="md" isBordered className="justify-start mt-4">
                {activity?.attendees.map((attendee) => (
                  <Avatar src={attendee.user.image} key={attendee.user.id} />
                ))}
              </AvatarGroup>
            )}
          </CardBody>
        </Card>
      )}
    </div>
  )
}
