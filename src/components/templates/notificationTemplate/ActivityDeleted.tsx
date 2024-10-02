import * as React from 'react'
import { NotificationSimpleMessage } from './SimpleMessage'

type ActivityDeletedTemplateProps = {
  activityTitle: string
}

export const NotificationActivityDeletedTemplate = ({
  activityTitle,
}: ActivityDeletedTemplateProps) => (
  <NotificationSimpleMessage
    message={
      <p>
        L&apos;activité {activityTitle} que vous participerez a été supprimée.
      </p>
    }
  />
)
