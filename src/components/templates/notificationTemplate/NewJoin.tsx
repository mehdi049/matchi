import { ROUTES } from '@/routes'
import { Link } from '@react-email/components'
import { AvatarMessage } from './AvatarMessage'

type NewJoinActivityTemplateProps = {
  attendeeId: string
  attendeeName: string
  attendeeImage: string
  activityId: number
  activityTitle: string
}
export const NotificationNewJoinActivityTemplate = ({
  attendeeId,
  attendeeName,
  attendeeImage,
  activityId,
  activityTitle,
}: NewJoinActivityTemplateProps) => {
  return (
    <AvatarMessage avatarName={attendeeName} avatarImage={attendeeImage}>
      <div className="text-xs text-wrap">
        <Link href={ROUTES.PROFILE(attendeeId)} className="underline">
          {attendeeName}
        </Link>{' '}
        a rejoint votre activité{' '}
        <Link href={ROUTES.ACTIVITY(activityId)} className="underline">
          {activityTitle}
        </Link>
      </div>
    </AvatarMessage>
  )
}
