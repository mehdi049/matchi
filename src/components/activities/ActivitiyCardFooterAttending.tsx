'use client'

import { UserContext } from '@/app/member/context/UserContext'
import { QUERY_KEYS } from '@/const/query_keys'
import useUpdateAttendance from '@/hooks/attendance/useUpdateAttendance'
import { getQueryClient } from '@/lib/getQueryClient'
import { AddedActivityResponseSm } from '@/types/AddedActivityResponse'
import {
  CardFooter,
  Button,
  useDisclosure,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from '@nextui-org/react'
import { useContext } from 'react'
import SuccessMessage from '../message/SuccessMessage'
import ErrorMessage from '../message/ErrorMessage'
import { MESSAGES } from '@/const/message'

export type ActivitiyCardFooterProps = {
  activity: AddedActivityResponseSm
}
export default function ActivitiyCardFooterAttending({
  activity,
}: ActivitiyCardFooterProps) {
  const { user, refetchUser } = useContext(UserContext)
  const {
    mutate: mutateUpdate,
    isPending: isPendingUpdate,
    isSuccess: isSuccessUpdate,
    isError: isErrorUpdate,
  } = useUpdateAttendance({
    onSuccess: () => {
      getQueryClient().invalidateQueries({
        queryKey: [QUERY_KEYS.ACTIVITY_ID, activity?.id],
      })
      getQueryClient().invalidateQueries({ queryKey: [QUERY_KEYS.ACTIVITIES] })
      getQueryClient().invalidateQueries({
        queryKey: [QUERY_KEYS.ACTIVITIES_BY_TYPE],
      })
      setTimeout(() => {
        refetchUser()
        onOpenChangeCancelAttendance()
      }, 2000)
    },
  })

  const {
    isOpen: isOpenCancelAttendance,
    onOpen: onOpenCancelAttendance,
    onOpenChange: onOpenChangeCancelAttendance,
  } = useDisclosure()

  const handleCancelCta = () => {
    mutateUpdate({
      userId: user.id,
      activityId: activity?.id as number,
      status: 'Cancelled',
    })
  }

  return (
    <CardFooter className="flex justify-end gap-2">
      <Button
        size="sm"
        variant="ghost"
        color="danger"
        onPress={onOpenCancelAttendance}
        radius="full"
      >
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
                  Une fois annulé, l&apos;organisateur de cette activité va être
                  notifié par email.
                </p>

                <SuccessMessage
                  isVisible={isSuccessUpdate && !isPendingUpdate}
                  className="mt-2"
                >
                  Votre présence est annulée avec succés
                </SuccessMessage>
                <ErrorMessage
                  isVisible={isErrorUpdate && !isPendingUpdate}
                  className="mt-2"
                >
                  {MESSAGES.ERROR.GENERAL}
                </ErrorMessage>
              </ModalBody>
              <ModalFooter>
                <Button variant="light" onPress={onClose}>
                  Fermer
                </Button>
                <Button
                  color="danger"
                  isLoading={isPendingUpdate}
                  onPress={handleCancelCta}
                >
                  Annuler
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </CardFooter>
  )
}
