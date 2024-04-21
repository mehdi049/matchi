'use client'

import { Avatar, Badge, Link, NavbarItem } from '@nextui-org/react'
import NotificationsBadge from './NotificationsBadge'

export default function SignedInMenu() {
  return (
    <>
      <NavbarItem>
        <NotificationsBadge />
      </NavbarItem>
      <NavbarItem>
        <Badge size="sm" content="+5" color="danger">
          <Link
            href="/member/messages"
            color="foreground"
            className="cursor-pointer pt-2 sm:pt-1 text-xs sm:text-base"
          >
            Messages
          </Link>
        </Badge>
      </NavbarItem>
      <NavbarItem>
        <Link
          href="/member/profile"
          color="foreground"
          className="cursor-pointer"
        >
          <Avatar
            name="Jane Doe"
            src="https://i.pravatar.cc/150?u=a04258114e29026702d"
            className="cursor-pointer"
          />
        </Link>
      </NavbarItem>
    </>
  )
}
