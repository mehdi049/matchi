import * as React from 'react'
import { Link } from '@react-email/components'
import { ROUTES } from '@/routes'
import { APP_URL } from '@/const/const'
import { NotificationSimpleMessage } from './SimpleMessage'

type ActivityUpdateTemplateProps = {
  activityTitle: string
  activityId: number
}

export const NotificationActivityUpdateTemplate = ({
  activityTitle,
  activityId,
}: ActivityUpdateTemplateProps) => (
  <NotificationSimpleMessage
    message={
      <p>
        L&apos;activité{' '}
        <Link
          href={APP_URL + '/' + ROUTES.ACTIVITY(activityId)}
          target="_blank"
        >
          {activityTitle}
        </Link>{' '}
        que vous participerez a été modifiée.
      </p>
    }
  />
)
