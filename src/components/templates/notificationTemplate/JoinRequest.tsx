import { ROUTES } from '@/routes'
import { Button } from '@nextui-org/react'
import { Link } from '@react-email/components'
import { AvatarMessage } from './AvatarMessage'

type JoinRequestTemplateProps = {
  attendeeId: string
  attendeeName: string
  attendeeImage: string
  activityId: number
  activityTitle: string
}
export const NotificationJoinRequestTemplate = ({
  attendeeId,
  attendeeName,
  attendeeImage,
  activityId,
  activityTitle,
}: JoinRequestTemplateProps) => {
  return (
    <AvatarMessage avatarName={attendeeName} avatarImage={attendeeImage}>
      <div>
        <div className="text-xs text-wrap">
          <Link href={ROUTES.PROFILE(attendeeId)} className="underline">
            {attendeeName}
          </Link>{' '}
          vous a envoyé une demande de rejoint pour votre activité{' '}
          <Link href={ROUTES.ACTIVITY(activityId)} className="underline">
            {activityTitle}
          </Link>
        </div>
        <div className="flex gap-1 items-end mt-2">
          <div>
            <Button
              size="sm"
              variant="ghost"
              color="primary"
              className="notif-action"
              data-action="accept-join-request"
              data-user-id={attendeeId}
              data-activity-id={activityId}
              data-activity-title={activityTitle}
            >
              Accepter
            </Button>
          </div>
          <div>
            <Button
              size="sm"
              variant="ghost"
              color="danger"
              className="notif-action"
              data-action="reject-join-request"
              data-user-id={attendeeId}
              data-activity-id={activityId}
            >
              Rejeter
            </Button>
          </div>
        </div>
      </div>
    </AvatarMessage>
  )
}
