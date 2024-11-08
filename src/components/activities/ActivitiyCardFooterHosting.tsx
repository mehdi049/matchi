'use client'

import {
  CardFooter,
  Button,
  Link,
  useDisclosure,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from '@nextui-org/react'
import { ActivitiyCardFooterProps } from './ActivitiyCardFooterAttending'
//import useDeleteActivity from '@/hooks/activity/useDeleteActivity'
import SuccessMessage from '../message/SuccessMessage'
import ErrorMessage from '../message/ErrorMessage'
import { useContext } from 'react'
import { useRouter } from 'next/navigation'
import { ROUTES } from '@/routes'
import useUpdateActivity from '@/hooks/activity/useUpdateActivity'
import { MESSAGES } from '@/const/message'
import { UserContext } from '@/app/member/context/UserContext'
import { getQueryClient } from '@/lib/getQueryClient'
import { QUERY_KEYS } from '@/const/query_keys'
import { ATTENDANCE_STATUS } from '@/types/UserAttendanceResponse'

export default function ActivitiyCardFooterHosting({
  activity,
}: ActivitiyCardFooterProps) {
  const router = useRouter()
  const { refetchUser } = useContext(UserContext)
  const {
    mutate: mutateUpdate,
    isPending: isPendingUpdate,
    isError: isErrorUpdate,
    isSuccess: isSuccessUpdate,
  } = useUpdateActivity({
    onSuccess: () => {
      getQueryClient().invalidateQueries({
        queryKey: [QUERY_KEYS.ACTIVITY_ID, activity.id],
      })
      getQueryClient().invalidateQueries({ queryKey: [QUERY_KEYS.ACTIVITIES] })
      getQueryClient().invalidateQueries({
        queryKey: [QUERY_KEYS.ACTIVITIES_BY_TYPE],
      })
      setTimeout(() => {
        refetchUser()
        onOpenChangeCancel()
      }, 3000)
    },
  })

  /*const {
    mutate: mutateDelete,
    isPending: isPendingDelete,
    isSuccess: isSuccessDelete,
    isError: isErrorDelete,
  } = useDeleteActivity({
    onSuccess: () => {
      setTimeout(() => {
        refetchUser()
        onOpenChangeDelete()
      }, 3000)
    },
  })*/

  const {
    isOpen: isOpenCancel,
    onOpen: onOpenCancel,
    onOpenChange: onOpenChangeCancel,
  } = useDisclosure()
  /*const {
    isOpen: isOpenDelete,
    onOpen: onOpenDelete,
    onOpenChange: onOpenChangeDelete,
  } = useDisclosure()*/

  /*const onDelete = () => {
    mutateDelete({ id: activity.id as number })
  }*/

  const onCancel = () => {
    mutateUpdate({
      id: activity.id as number,
      activity: {
        status: ATTENDANCE_STATUS.CANCELLED,
        activityId: activity?.activity?.id as number,
      },
    })
  }

  return (
    <CardFooter className="block">
      {activity.status == 'Active' ? (
        <>
          <div className="flex justify-end gap-2 mb-2">
            <Button
              size="sm"
              variant="ghost"
              color="danger"
              onClick={onOpenCancel}
              radius="full"
            >
              Annuler
            </Button>
            <Modal
              size="lg"
              isOpen={isOpenCancel}
              onOpenChange={onOpenChangeCancel}
            >
              <ModalContent>
                {(onClose) => (
                  <>
                    <ModalHeader className="flex flex-col gap-1">
                      Vous êtes sûre de vouloir annuler cette activité?
                    </ModalHeader>
                    <ModalBody>
                      <p>
                        Une fois annulé, aucune personne ne pourra participé à
                        votre activité.
                      </p>
                      <p>Tous les participants seront notifié par email.</p>

                      <SuccessMessage
                        isVisible={isSuccessUpdate && !isPendingUpdate}
                        className="mt-2"
                      >
                        Activité annulé avec succés
                      </SuccessMessage>
                      <ErrorMessage
                        isVisible={isErrorUpdate && !isPendingUpdate}
                        className="mt-2"
                      >
                        {MESSAGES.ERROR.GENERAL}
                      </ErrorMessage>
                    </ModalBody>
                    <ModalFooter>
                      <Button variant="light" onClick={onClose}>
                        Fermer
                      </Button>
                      <Button
                        color="danger"
                        onClick={onCancel}
                        isLoading={isPendingUpdate}
                        isDisabled={isSuccessUpdate && !isPendingUpdate}
                      >
                        Annuler
                      </Button>
                    </ModalFooter>
                  </>
                )}
              </ModalContent>
            </Modal>

            {/* 
// We will keep only cancel button and remove delete button
            <Button
              size="sm"
              variant="ghost"
              color="danger"
              onClick={onOpenDelete}
              radius="full"
            >
              Supprimer
            </Button>
            <Modal
              size="lg"
              isOpen={isOpenDelete}
              onOpenChange={onOpenChangeDelete}
            >
              <ModalContent>
                {(onClose) => (
                  <>
                    <ModalHeader className="flex flex-col gap-1">
                      Vous êtes sûre de vouloir supprimer cette activité?
                    </ModalHeader>
                    <ModalBody>
                      <p>
                        Une fois supprimé, votre activité ne sera plus affiché
                        sur le site.
                      </p>
                      <p>Tous les participants seront notifié par email.</p>
                      <SuccessMessage
                        isVisible={isSuccessDelete && !isPendingDelete}
                        className="mt-2"
                      >
                        Activité supprimé avec succés
                      </SuccessMessage>
                      <ErrorMessage
                        isVisible={isErrorDelete && !isPendingDelete}
                        className="mt-2"
                      >
                        {MESSAGES.ERROR.GENERAL}
                      </ErrorMessage>
                    </ModalBody>
                    <ModalFooter>
                      <Button variant="light" onClick={onClose}>
                        Fermer
                      </Button>
                      <Button
                        color="danger"
                        onClick={onDelete}
                        isLoading={isPendingDelete}
                        isDisabled={isSuccessDelete && !isPendingDelete}
                      >
                        Supprimer
                      </Button>
                    </ModalFooter>
                  </>
                )}
              </ModalContent>
            </Modal>
*/}
            <Button
              as={Link}
              onClick={() =>
                router.push(ROUTES.MEMBER.EDIT_ACTIVITY(activity.id as number))
              }
              size="sm"
              color="primary"
              radius="full"
            >
              Modifier
            </Button>

            <Button
              as={Link}
              href="/profiles"
              size="sm"
              color="primary"
              radius="full"
              variant="flat"
            >
              Inviter des participants
            </Button>
          </div>
        </>
      ) : (
        <div className="text-right">
          <Button size="sm" color="danger" radius="full" variant="flat">
            Annulée
          </Button>
        </div>
      )}
    </CardFooter>
  )
}
