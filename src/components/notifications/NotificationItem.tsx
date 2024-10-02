'use client'

import { NotificationResponse } from '@/types/NotificationResponse'
import { fullDate } from '@/utils/date'
import { useContext, useEffect, useState } from 'react'
import useUpdateAttendance from '@/hooks/attendance/useUpdateAttendance'
import { UserContext } from '@/app/member/context/UserContext'
import { createNotification } from '@/app/actions'
import useDeleteNotification from '@/hooks/notifications/useDeleteNotification'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons'
import { NotificationJoinRequestAccepted } from '../templates/notificationTemplate/JoinRequestAccepted'
import { NotificationJoinRequestRejected } from '../templates/notificationTemplate/JoinRequestRejected'
import { NotificationSimpleMessageSuccess } from '../templates/notificationTemplate/SimpleMessageSuccess'
import { NotificationSimpleMessageError } from '../templates/notificationTemplate/SimpleMessageError'
import {
  ATTENDANCE_STATUS,
  UserAttendanceRequestStatus,
} from '@/types/UserAttendanceResponse'

type NotificationProps = {
  notification: NotificationResponse
}
export default function NotificationItem({ notification }: NotificationProps) {
  const { user } = useContext(UserContext)
  const [requestResponse, setRequestResponse] =
    useState<UserAttendanceRequestStatus>(ATTENDANCE_STATUS.ACCEPTED)
  const [selectedActivityId, setSelectedActivityId] = useState('')
  const [selectedActivityTitle, setSelectedActivityTitle] = useState('')
  const [selectedUserId, setSelectedUserId] = useState('')

  const { mutate: mutateUpdate, isPending: isPendingUpdate } =
    useUpdateAttendance({
      onSuccess: () => {
        // send notification to the concerned member about the join request response
        createNotification({
          template:
            requestResponse === ATTENDANCE_STATUS.ACCEPTED
              ? NotificationJoinRequestAccepted({
                  user: user,
                  activityId: parseInt(selectedActivityId),
                  activityTitle: selectedActivityTitle,
                })
              : NotificationJoinRequestRejected({
                  user: user,
                  activityId: parseInt(selectedActivityId),
                  activityTitle: selectedActivityTitle,
                }),
          userId: selectedUserId,
        })

        // notification to the current user who accepted / rejected the request
        createNotification({
          template:
            requestResponse === ATTENDANCE_STATUS.ACCEPTED
              ? NotificationSimpleMessageSuccess({
                  message: <>Demande accépté avec succés</>,
                })
              : NotificationSimpleMessageError({
                  message: <>Demande Rejété avec succés</>,
                }),
          userId: user.id,
        })

        // delete notification after accept / reject request
        OnDeleteNotification()
      },
    })

  const { mutate, isPending: isPendingDelete } = useDeleteNotification({})

  useEffect(() => {
    // TO FIX DOUBLE RENDERING => DOUBLE NOTIFICATION

    const triggerAction = (element: Element) => {
      if (!isPendingUpdate) {
        const action = element.getAttribute('data-action')
        if (action === 'accept-join-request') {
          element.setAttribute('disabled', 'true')
          const userId = element.getAttribute('data-user-id')
          const activityId = element.getAttribute('data-activity-id')
          const activityTitle = element.getAttribute('data-activity-title')
          if (userId && activityId && activityTitle) {
            mutateUpdate({
              userId: userId as string,
              activityId: parseInt(activityId),
              status: ATTENDANCE_STATUS.ACCEPTED,
            })
            setRequestResponse(ATTENDANCE_STATUS.ACCEPTED)
            setSelectedUserId(userId)
            setSelectedActivityId(activityId)
            setSelectedActivityTitle(activityTitle)
          }
        }
        if (action === 'reject-join-request') {
          element.setAttribute('disabled', 'true')
          const userId = element.getAttribute('data-user-id')
          const activityId = element.getAttribute('data-activity-id')
          const activityTitle = element.getAttribute('data-activity-title')
          if (userId && activityId && activityTitle) {
            mutateUpdate({
              userId: userId as string,
              activityId: parseInt(activityId),
              status: ATTENDANCE_STATUS.REJECTED,
            })
            setRequestResponse(ATTENDANCE_STATUS.REJECTED)
            setSelectedUserId(userId)
            setSelectedActivityId(activityId)
            setSelectedActivityTitle(activityTitle)
          }
        }
      }
    }

    const elements = document.getElementsByClassName('notif-action')

    if (elements) {
      Array.from(elements).forEach((element) =>
        element.addEventListener('click', () => triggerAction(element))
      )
    }
  }, [])

  const OnDeleteNotification = () => {
    if (!isPendingDelete)
      mutate({
        id: notification.id,
      })
  }

  return (
    <div
      className={
        'relative p-2 pr-5 ' +
        (notification.viewed ? 'hover:bg-gray-100' : 'bg-gray-100') +
        ' ' +
        (isPendingUpdate || isPendingDelete ? 'opacity-50' : '')
      }
    >
      <div className="text-right text-red-500 absolute right-1 top-1">
        <FontAwesomeIcon
          icon={faCircleXmark}
          className="cursor-pointer"
          size="xs"
          onClick={OnDeleteNotification}
        />
      </div>
      <div
        className="flex gap-2 justify-start cursor-pointer items-center "
        dangerouslySetInnerHTML={{ __html: notification.content }}
      ></div>
      <span className="block text-right text-xs text-gray-400">
        {fullDate(notification.createdAt)}
      </span>
    </div>
  )
}
