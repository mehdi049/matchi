import { Modal, ModalBody, ModalContent, ModalHeader } from '@nextui-org/react'
import LoginForm from './LoginForm'

type ModalLoginFormProps = {
  isOpen: boolean
  onOpenChange: (isOpen: boolean) => void
}
export const ModalLoginForm = ({
  isOpen,
  onOpenChange,
}: ModalLoginFormProps) => {
  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      isDismissable={false}
      isKeyboardDismissDisabled={true}
    >
      <ModalContent>
        <ModalHeader className="flex flex-col gap-1">Me connecter</ModalHeader>
        <ModalBody>
          <LoginForm />
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}
