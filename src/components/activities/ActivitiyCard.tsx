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
import { faLocationDot } from '@fortawesome/free-solid-svg-icons'
import { useRouter } from 'next/navigation'
import ActivitiyCardFooterAttending from './ActivitiyCardFooterAttending'
import ActivitiyCardFooterHosting from './ActivitiyCardFooterHosting'
import { AddedActivityResponseSm } from '@/types/User'
import { ROUTES } from '@/routes'
import { fullDate } from '@/utils/date'

type ActivityProps = {
  activity?: AddedActivityResponseSm
  hosting?: boolean
  attending?: boolean
  status?: 'Pending' | 'Accepted' | 'Rejected'
}
export default function ActivityCard({
  activity,
  hosting,
  attending,
  status,
}: ActivityProps) {
  const router = useRouter()

  return (
    <>
      {activity && (
        <div
          onClick={() => {
            router.push(ROUTES.ACTIVITY(activity?.id as number))
          }}
        >
          <Card className="py-4 cursor-pointer grow">
            <CardHeader className="flex-col items-start">
              <div className="flex w-full justify-between gap-2">
                <div className="flex gap-5">
                  <Avatar
                    isBordered
                    radius="full"
                    size="md"
                    src={activity.createdBy?.image}
                  />
                  <div className="flex flex-col gap-1 items-start justify-center">
                    <h4 className="text-small font-semibold leading-none text-default-600">
                      {activity.createdBy?.name}
                    </h4>
                    <h5 className="text-small tracking-tight text-default-400">
                      {fullDate(activity.date)}
                    </h5>
                    <h5 className="text-small tracking-tight text-default-400">
                      <FontAwesome icon={faLocationDot} /> {activity.place}
                    </h5>
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <Chip color="primary" size="sm" variant="flat">
                    {activity.activity?.name}
                  </Chip>
                  {status && (
                    <>
                      {status === 'Accepted' && (
                        <Chip color="success" size="sm" variant="flat">
                          Accepté
                        </Chip>
                      )}
                      {status === 'Rejected' && (
                        <Chip color="danger" size="sm">
                          Rejeté
                        </Chip>
                      )}
                      {status === 'Pending' && (
                        <Chip size="sm">En attente</Chip>
                      )}
                    </>
                  )}
                </div>
              </div>
              <h4 className="font-bold text-large mt-4">{activity.title}</h4>
            </CardHeader>
            <CardBody className="overflow-visible py-2">
              <Image
                alt="Card background"
                className="object-cover rounded-xl w-full sm:max-w-sm"
                src={activity.activity?.image}
              />
            </CardBody>
            <CardFooter className="flex justify-between gap-2">
              <div className="flex gap-1">
                <p className="font-semibold text-default-400 text-small">
                  {activity.attendees?.length}/{activity.maxAttendees}
                </p>
                <p className=" text-default-400 text-small">Participant(s)</p>
              </div>

              {activity.attendees && activity.attendees?.length > 0 && (
                <>
                  <AvatarGroup size="sm" isBordered max={3}>
                    {activity.attendees?.map((attendee) => {
                      return <Avatar src={attendee.image} key={attendee.id} />
                    })}
                  </AvatarGroup>
                </>
              )}
            </CardFooter>
            {hosting && activity?.id && (
              <ActivitiyCardFooterHosting activityId={activity.id as number} />
            )}

            {attending && activity?.id && (
              <ActivitiyCardFooterAttending
                activityId={activity?.id as number}
              />
            )}
          </Card>
        </div>
      )}
    </>
  )
}
