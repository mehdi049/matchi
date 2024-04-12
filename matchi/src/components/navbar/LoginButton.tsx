'use client'

import {
  Link,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  useDisclosure,
} from '@nextui-org/react'
import LoginForm from './LoginForm'

export default function LoginButton() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure()

  return (
    <>
      <Link color="foreground" className="cursor-pointer" onPress={onOpen}>
        Me connecter
      </Link>

      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        isDismissable={false}
        isKeyboardDismissDisabled={true}
      >
        <ModalContent>
          <ModalHeader className="flex flex-col gap-1">
            Me connecter
          </ModalHeader>
          <ModalBody>
            <LoginForm />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}
