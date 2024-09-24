import { UserContext } from '@/app/member/context/UserContext'
import useAddAttendance from '@/hooks/attendance/useAddAttendance'
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from '@nextui-org/react'
import { useContext } from 'react'
import { ModalLoginForm } from '../navbar/ModalLoginForm'
import { ActivityProps } from './ActivityCardDetails'
import { getQueryClient } from '@/lib/getQueryClient'
import { QUERY_KEYS } from '@/const/query_keys'
import { fullDate } from '@/utils/date'
import FontAwesome from '../fontAwesome/FontAwesome'
import { faCheck } from '@fortawesome/free-solid-svg-icons'
import useUpdateAttendance from '@/hooks/attendance/useUpdateAttendance'
import {
  ADDED_ACTIVITY_TYPE,
  AddedActivityResponse,
} from '@/types/AddedActivityResponse'
import { NotificationJoinRequestTemplate } from '../templates/notificationTemplate/JoinRequest'
import { ATTENDANCE_STATUS } from '@/types/UserAttendanceResponse'
import { createNotification } from '@/app/actions'
import { NotificationNewJoinActivityTemplate } from '../templates/notificationTemplate/NewJoin'

export const CTAJoin = ({ activity }: ActivityProps) => {
  const { user, isLoggedIn } = useContext(UserContext)

  const {
    mutate: mutateAdd,
    isPending: isPendingAdd,
    isSuccess: isSuccessAdd,
  } = useAddAttendance({
    onSuccess: () => {
      getQueryClient().invalidateQueries({
        queryKey: [QUERY_KEYS.ACTIVITY_ID, activity?.id],
      })
      createNotification({
        template:
          activity?.type === ADDED_ACTIVITY_TYPE.PUBLIC
            ? NotificationNewJoinActivityTemplate({
                user: user,
                activity: activity as AddedActivityResponse,
              })
            : NotificationJoinRequestTemplate({
                user: user,
                activity: activity as AddedActivityResponse,
              }),
        userId: activity?.createdBy?.id as string,
      })
    },
  })

  const {
    mutate: mutateUpdate,
    isPending: isPendingUpdate,
    isSuccess: isSuccessUpdate,
  } = useUpdateAttendance({
    onSuccess: () => {
      getQueryClient().invalidateQueries({
        queryKey: [QUERY_KEYS.ACTIVITY_ID, activity?.id],
      })
    },
  })

  const { isOpen: isOpenLoginForm, onOpenChange: onOpenChangeLoginForm } =
    useDisclosure()

  const {
    isOpen: isOpenCancelAttendance,
    onOpen: onOpenCancelAttendance,
    onOpenChange: onOpenChangeCancelAttendance,
  } = useDisclosure()

  const handleJoinCta = () => {
    if (isLoggedIn)
      mutateAdd({
        attendance: {
          addedActivityId: activity?.id as number,
          userId: user.id,
        },
      })
    else return onOpenChangeLoginForm()
  }

  const handleCancelCta = () => {
    mutateUpdate({
      userId: user.id,
      activityId: activity?.id as number,
      status: ATTENDANCE_STATUS.CANCELLED,
    })
  }

  const currentAttendance = user.userAttendance?.find(
    (attendance) => attendance.addedActivityId === activity?.id
  )

  const isMyActivity = activity?.createdBy?.id === user?.id
  if (isMyActivity) return null

  const isAlreadyAttending =
    currentAttendance?.status === ATTENDANCE_STATUS.ACCEPTED
  const isRequestPending =
    currentAttendance?.status === ATTENDANCE_STATUS.PENDING
  const isRequestCancelled =
    currentAttendance?.status === ATTENDANCE_STATUS.CANCELLED
  const isRequestRejected =
    currentAttendance?.status === ATTENDANCE_STATUS.REJECTED

  if (isAlreadyAttending)
    return (
      <>
        {!isSuccessUpdate ? (
          <>
            <Button size="sm" color="danger" onClick={onOpenCancelAttendance}>
              Annuler ma presence
            </Button>

            <Modal
              size="lg"
              isOpen={isOpenCancelAttendance}
              onOpenChange={onOpenChangeCancelAttendance}
            >
              <ModalContent>
                {(onClose) => (
                  <>
                    <ModalHeader className="flex flex-col gap-1">
                      Vous êtes sûre de vouloir annuler votre présence?
                    </ModalHeader>
                    <ModalBody>
                      <p>
                        Une fois annulé, l&apos;organisateur de cette activité
                        va être notifié par email.
                      </p>
                    </ModalBody>
                    <ModalFooter>
                      <Button variant="light" onClick={onClose}>
                        Fermer
                      </Button>
                      <Button
                        color="danger"
                        isLoading={isPendingUpdate}
                        onClick={handleCancelCta}
                      >
                        Annuler
                      </Button>
                    </ModalFooter>
                  </>
                )}
              </ModalContent>
            </Modal>
          </>
        ) : (
          <Button
            size="sm"
            color="danger"
            variant="bordered"
            className="cursor-default"
          >
            Demande de rejoint annulé
          </Button>
        )}
      </>
    )

  if (isRequestPending)
    return (
      <>
        <Button
          size="sm"
          color="warning"
          variant="flat"
          className="cursor-default"
        >
          Demande en attente
        </Button>
        <p className="text-xs text-gray-400">
          Demande envoyé le{' '}
          {fullDate(currentAttendance.statusUpdatedAt as Date)}
        </p>
      </>
    )

  if (isRequestCancelled)
    return (
      <Button
        size="sm"
        color="danger"
        variant="bordered"
        className="cursor-default"
      >
        Demande de rejoint annulé
      </Button>
    )

  if (isRequestRejected)
    return (
      <Button
        size="sm"
        color="danger"
        variant="bordered"
        className="cursor-default"
      >
        Demande de rejoint non accépté
      </Button>
    )

  return (
    <>
      {!isSuccessAdd ? (
        <Button
          size="sm"
          color="primary"
          onClick={handleJoinCta}
          isLoading={isPendingAdd}
        >
          Rejoindre
        </Button>
      ) : activity?.type === ADDED_ACTIVITY_TYPE.PUBLIC ? (
        <Button
          size="sm"
          color="success"
          className="text-white max-w-min cursor-default"
        >
          <FontAwesome icon={faCheck} size="1x" />
        </Button>
      ) : (
        <Button size="sm" color="success" className="text-white cursor-default">
          Demande envoyé
        </Button>
      )}
      <ModalLoginForm
        isOpen={isOpenLoginForm}
        onOpenChange={onOpenChangeLoginForm}
      />
    </>
  )
}
