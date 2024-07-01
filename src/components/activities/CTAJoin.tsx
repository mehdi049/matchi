import { UserContext } from '@/app/member/context/UserContext'
import useAddAttendance from '@/hooks/attendance/useAddAttendance'
import { Button, useDisclosure } from '@nextui-org/react'
import { useContext } from 'react'
import { ModalLoginForm } from '../navbar/ModalLoginForm'
import { ActivityProps } from './ActivityCardDetails'
import { getQueryClient } from '@/lib/getQueryClient'
import { QUERY_KEYS } from '@/const/query_keys'
import { fullDate } from '@/utils/date'
import FontAwesome from '../fontAwesome/FontAwesome'
import { faCheck, faSquareCheck } from '@fortawesome/free-solid-svg-icons'

export const CTAJoin = ({ activity }: ActivityProps) => {
  const { user, isLoggedIn } = useContext(UserContext)

  const { mutate, isPending, isSuccess } = useAddAttendance({
    onSuccess: () => {
      getQueryClient().invalidateQueries({
        queryKey: [QUERY_KEYS.ACTIVITY_ID, activity?.id],
      })
    },
  })

  const { isOpen, onOpenChange } = useDisclosure()

  const handleJoinCta = () => {
    if (isLoggedIn)
      mutate({
        attendance: {
          addedActivityId: activity?.id as number,
          userId: user.id,
        },
      })
    else return onOpenChange()
  }

  const currentAttendance = user.userAttendance?.find(
    (attendance) => attendance.addedActivityId === activity?.id
  )

  const isMyActivity = activity?.createdBy?.id === user?.id
  if (isMyActivity) return null

  const isAlreadyAttending = currentAttendance?.status === 'Accepted'
  const isRequestPending = currentAttendance?.status === 'Pending'

  if (isAlreadyAttending)
    return (
      <Button
        size="sm"
        color="danger"
        onClick={handleJoinCta}
        isLoading={isPending}
      >
        Annuler ma presence
      </Button>
    )

  if (isRequestPending)
    return (
      <>
        <Button size="sm" color="warning" variant="flat">
          Demande en attente
        </Button>
        <p className="text-xs text-gray-400">
          Demande envoyé le{' '}
          {fullDate(currentAttendance.statusUpdatedAt as Date)}
        </p>
      </>
    )

  return (
    <>
      {!isSuccess ? (
        <Button
          size="sm"
          color="primary"
          onClick={handleJoinCta}
          isLoading={isPending}
        >
          Rejoindre
        </Button>
      ) : activity?.type === 'Public' ? (
        <Button size="sm" color="success" className="text-white max-w-min">
          <FontAwesome icon={faCheck} size="1x" />
        </Button>
      ) : (
        <Button size="sm" color="success" value="flat" className="text-white">
          Demande envoyé
        </Button>
      )}
      <ModalLoginForm isOpen={isOpen} onOpenChange={onOpenChange} />
    </>
  )
}
