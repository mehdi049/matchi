import { ROUTES } from '@/routes'
import { AddedActivityResponse } from '@/types/AddedActivityResponse'
import { UserResponseSm } from '@/types/User'
import { Avatar, Button } from '@nextui-org/react'
import Link from 'next/link'

type NewJoinActivityTemplateProps = {
  user: UserResponseSm
  activity: AddedActivityResponse
}
export const NotificationJoinRequestTemplate = ({
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
          vous a envoyé une demande de rejoint pour votre activité{' '}
          <Link
            href={ROUTES.ACTIVITY(activity?.id as number)}
            className="underline"
          >
            {activity.title}
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
              data-user-id={user.id}
              data-activity-id={activity.id}
              data-activity-title={activity.title}
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
              data-user-id={user.id}
              data-activity-id={activity.id}
            >
              Rejeter
            </Button>
          </div>
        </div>
      </div>
    </>
  )
}
