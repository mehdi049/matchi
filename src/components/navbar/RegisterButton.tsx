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
import useMediaQuery from '@/hooks/useMediaQuery'

export default function RegisterButton() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure()
  const [isMobileScreen] = useMediaQuery('mobile')

  return (
    <>
      <Button onClick={onOpen} size={isMobileScreen ? 'sm' : 'md'}>
        Créer un compte
      </Button>

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
