'use client'

import {
  Card,
  CardHeader,
  CardBody,
  Image,
  Avatar,
  CardFooter,
  Chip,
  AvatarGroup,
} from '@nextui-org/react'
import FontAwesome from '../fontAwesome/FontAwesome'
import { faLocationDot, faLock } from '@fortawesome/free-solid-svg-icons'
import { useRouter } from 'next/navigation'
import ActivitiyCardFooterAttending from './ActivitiyCardFooterAttending'
import ActivitiyCardFooterHosting from './ActivitiyCardFooterHosting'
import { ROUTES } from '@/routes'
import { fullDate } from '@/utils/date'
import {
  ADDED_ACTIVITY_TYPE,
  AddedActivityResponse,
  AddedActivityResponseSm,
} from '@/types/AddedActivityResponse'
import H3 from '../typography/H3'
import {
  ATTENDANCE_STATUS,
  UserAttendanceRequestStatus,
} from '@/types/UserAttendanceResponse'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

type ActivityProps = {
  activity: AddedActivityResponseSm | AddedActivityResponse
  hosting?: boolean
  attending?: boolean
  requestStatus?: UserAttendanceRequestStatus
  displayFooter?: boolean
  display?: 'full' | 'minimal'
}
export default function ActivityCard({
  activity,
  hosting,
  attending,
  requestStatus,
  displayFooter,
  display = 'full',
}: ActivityProps) {
  const router = useRouter()

  return (
    <>
      {activity && (
        <div>
          <Card className="py-4 cursor-pointer grow h-full">
            <CardHeader
              className="flex-col items-start"
              onClick={() => {
                router.push(ROUTES.ACTIVITY(activity?.id as number))
              }}
            >
              <div className="flex gap-2 mb-4 w-full">
                <Chip color="primary" size="sm" variant="flat">
                  {activity.activity?.name}
                </Chip>
                {activity.type === ADDED_ACTIVITY_TYPE.PRIVATE && (
                  <Chip color="warning" size="sm" variant="flat">
                    <FontAwesomeIcon icon={faLock} /> Privée
                  </Chip>
                )}

                {requestStatus && (
                  <>
                    {requestStatus === ATTENDANCE_STATUS.ACCEPTED && (
                      <Chip color="success" size="sm" variant="flat">
                        Accepté
                      </Chip>
                    )}
                    {requestStatus === ATTENDANCE_STATUS.REJECTED && (
                      <Chip color="danger" size="sm">
                        Rejeté
                      </Chip>
                    )}
                    {requestStatus === ATTENDANCE_STATUS.CANCELLED && (
                      <Chip color="danger" size="sm">
                        Annulée
                      </Chip>
                    )}
                    {requestStatus === ATTENDANCE_STATUS.PENDING && (
                      <Chip size="sm">En attente</Chip>
                    )}
                  </>
                )}
              </div>
              <div className="flex w-full justify-between gap-2">
                <div className="flex gap-5">
                  <div>
                    <Avatar
                      isBordered
                      radius="full"
                      size="md"
                      src={activity.createdBy?.image}
                    />
                  </div>

                  <div className="flex flex-col gap-1 items-start justify-center">
                    <h4 className="text-small font-semibold leading-none text-default-600">
                      {activity.createdBy?.name}
                    </h4>
                    <p className="text-small tracking-tight text-default-400">
                      {fullDate(activity.date)}
                    </p>
                    <p className="text-small tracking-tight text-default-400 sm:h-10 sm:overflow-hidden">
                      <FontAwesome icon={faLocationDot} /> {activity.city},{' '}
                      {activity.place}
                    </p>
                  </div>
                </div>
              </div>
              {display === 'full' && (
                <H3 className="mt-4 sm:h-[56px] sm:overflow-hidden">
                  {activity.title}
                </H3>
              )}
            </CardHeader>
            {display === 'full' && (
              <>
                <CardBody
                  className="overflow-visible py-2"
                  onClick={() => {
                    router.push(ROUTES.ACTIVITY(activity?.id as number))
                  }}
                >
                  <Image
                    alt="Card background"
                    className="object-cover rounded-xl w-full sm:max-w-sm"
                    src={activity.activity?.image}
                  />
                </CardBody>
                <CardFooter
                  className="flex justify-between gap-2"
                  onClick={() => {
                    router.push(ROUTES.ACTIVITY(activity?.id as number))
                  }}
                >
                  <div className="flex gap-1">
                    <p className="font-semibold text-default-400 text-small">
                      {activity?.attendees?.length}
                      {activity?.maxAttendees && activity?.maxAttendees > 0 ? (
                        <>/ {activity.maxAttendees}</>
                      ) : (
                        <></>
                      )}
                    </p>
                    <p className=" text-default-400 text-small">
                      Participant(s)
                    </p>
                  </div>

                  {activity.attendees && activity.attendees?.length > 0 && (
                    <>
                      <AvatarGroup size="sm" isBordered max={3}>
                        {activity.attendees?.map((attendee) => {
                          return (
                            <Avatar
                              src={attendee.user.image}
                              key={attendee.user.id}
                            />
                          )
                        })}
                      </AvatarGroup>
                    </>
                  )}
                </CardFooter>
              </>
            )}
            {displayFooter && (
              <>
                {hosting && activity?.id && (
                  <ActivitiyCardFooterHosting activity={activity} />
                )}

                {attending && activity?.id && (
                  <ActivitiyCardFooterAttending activity={activity} />
                )}
              </>
            )}
          </Card>
        </div>
      )}
    </>
  )
}
