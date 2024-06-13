'use client'

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

export type ActivitiyCardFooterProps = {
  activityId: number
}
export default function ActivitiyCardFooterAttending({
  activityId,
}: ActivitiyCardFooterProps) {
  const {
    isOpen: isOpenCancelAttendance,
    onOpen: onOpenCancelAttendance,
    onOpenChange: onOpenChangeCancelAttendance,
  } = useDisclosure()
  return (
    <CardFooter className="flex justify-end gap-2">
      <Button
        size="sm"
        variant="ghost"
        color="danger"
        onPress={onOpenCancelAttendance}
        radius="full"
      >
        Annuler
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
              </ModalBody>
              <ModalFooter>
                <Button variant="light" onPress={onClose}>
                  Fermer
                </Button>
                <Button color="danger" onPress={onClose}>
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
