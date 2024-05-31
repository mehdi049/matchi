'use client'

import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  useDisclosure,
} from '@nextui-org/react'
import RegisterForm from './RegisterForm'

export default function RegisterButton() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure()

  return (
    <>
      <Button onPress={onOpen}>Créer un compte</Button>

      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        isDismissable={false}
        isKeyboardDismissDisabled={true}
      >
        <ModalContent>
          <ModalHeader className="flex flex-col gap-1">
            Créer un compte
          </ModalHeader>
          <ModalBody>
            <RegisterForm />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}
