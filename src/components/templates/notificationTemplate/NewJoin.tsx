import { ROUTES } from '@/routes'
import { AddedActivityResponse } from '@/types/AddedActivityResponse'
import { UserResponseSm } from '@/types/User'
import { Avatar } from '@nextui-org/react'
import Link from 'next/link'

type NewJoinActivityTemplateProps = {
  user: UserResponseSm
  activity: AddedActivityResponse
}
export const NotificationNewJoinActivityTemplate = ({
  user,
  activity,
}: NewJoinActivityTemplateProps) => {
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
          a rejoint votre activité{' '}
          <Link
            href={ROUTES.ACTIVITY(activity?.id as number)}
            className="underline"
          >
            {activity.title}
          </Link>
        </div>
      </div>
    </>
  )
}
