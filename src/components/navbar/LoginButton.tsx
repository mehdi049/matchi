'use client'

import { Link, useDisclosure } from '@nextui-org/react'
import { ModalLoginForm } from './ModalLoginForm'
import useMediaQuery from '@/hooks/useMediaQuery'

export default function LoginButton() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure()
  const [isMobileScreen] = useMediaQuery('mobile')

  return (
    <>
      <Link
        color="foreground"
        className="cursor-pointer"
        size={isMobileScreen ? 'sm' : 'md'}
        onPress={onOpen}
      >
        Me connecter
      </Link>

      <ModalLoginForm isOpen={isOpen} onOpenChange={onOpenChange} />
    </>
  )
}
