'use client'

import { Link, useDisclosure } from '@nextui-org/react'
import { ModalLoginForm } from './ModalLoginForm'

export default function LoginButton() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure()

  return (
    <>
      <Link color="foreground" className="cursor-pointer" onPress={onOpen}>
        Me connecter
      </Link>

      <ModalLoginForm isOpen={isOpen} onOpenChange={onOpenChange} />
    </>
  )
}
