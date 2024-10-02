import * as React from 'react'
import { NotificationSimpleMessage } from './SimpleMessage'

type ActivityCancelledTemplateProps = {
  activityTitle: string
}

export const NotificationActivityCancelledTemplate = ({
  activityTitle,
}: ActivityCancelledTemplateProps) => (
  <NotificationSimpleMessage
    message={
      <p>
        L&apos;activité {activityTitle} que vous participerez a été annulée.
      </p>
    }
  />
)
