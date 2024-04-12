'use client'

import { NavbarItem } from '@nextui-org/react'
import LoginButton from './LoginButton'
import RegisterButton from './RegisterButton'

export default function SignInMenu() {
  return (
    <>
      <NavbarItem>
        <LoginButton />
      </NavbarItem>
      <NavbarItem>
        <RegisterButton />
      </NavbarItem>
    </>
  )
}
