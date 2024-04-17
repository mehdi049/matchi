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
import { useRouter } from 'next/navigation'
import { ActivitiyCardFooterProps } from './ActivitiyCardFooterAttending'

export default function ActivitiyCardFooterHosting({
  activity,
}: ActivitiyCardFooterProps) {
  const router = useRouter()
  const {
    isOpen: isOpenCancel,
    onOpen: onOpenCancel,
    onOpenChange: onOpenChangeCancel,
  } = useDisclosure()
  const {
    isOpen: isOpenDelete,
    onOpen: onOpenDelete,
    onOpenChange: onOpenChangeDelete,
  } = useDisclosure()

  return (
    <CardFooter className="flex justify-end gap-2">
      <Button
        size="sm"
        variant="ghost"
        color="danger"
        onPress={onOpenCancel}
        radius="full"
      >
        Annuler
      </Button>
      <Modal size="lg" isOpen={isOpenCancel} onOpenChange={onOpenChangeCancel}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Vous êtes sûre de vouloir annuler cette activité?
              </ModalHeader>
              <ModalBody>
                <p>
                  Une fois annulé, aucune personne ne pourra participé à votre
                  activité.
                </p>
                <p>Tous les participants seront notifié par email.</p>
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

      <Button
        size="sm"
        variant="ghost"
        color="danger"
        onPress={onOpenDelete}
        radius="full"
      >
        Supprimer
      </Button>

      <Modal size="lg" isOpen={isOpenDelete} onOpenChange={onOpenChangeDelete}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Vous êtes sûre de vouloir supprimer cette activité?
              </ModalHeader>
              <ModalBody>
                <p>
                  Une fois supprimé, votre activité ne sera plus affiché sur le
                  site.
                </p>
                <p>Tous les participants seront notifié par email.</p>
              </ModalBody>
              <ModalFooter>
                <Button variant="light" onPress={onClose}>
                  Fermer
                </Button>
                <Button color="danger" onPress={onClose}>
                  Supprimer
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>

      <Button
        as={Link}
        href="/member/activities/edit/1"
        size="sm"
        color="primary"
        radius="full"
      >
        Modifier
      </Button>
    </CardFooter>
  )
}
