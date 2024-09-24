import { ROUTES } from '@/routes'
import { Avatar } from '@nextui-org/react'
import Link from 'next/link'
import { JoinRequestResponseProps } from './JoinRequestAccepted'

export const NotificationJoinRequestRejected = ({
  user,
  activityId,
  activityTitle,
}: JoinRequestResponseProps) => {
  return (
    <>
      <div>
        <Avatar
          className="w-8 h-8 opacity-100-f"
          name={user.name}
          src={user.image}
        />
      </div>
      <div>
        <div className="text-xs text-wrap">
          <Link href={ROUTES.PROFILE(user?.id)} className="underline">
            {user.name}
          </Link>{' '}
          a rejeté votre demande de rejoint à l&apos;activité{' '}
          <Link href={ROUTES.ACTIVITY(activityId)} className="underline">
            {activityTitle}
          </Link>
        </div>
      </div>
    </>
  )
}
