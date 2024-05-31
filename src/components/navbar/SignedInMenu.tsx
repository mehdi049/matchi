'use client'

import { Avatar, Badge, Link, NavbarItem } from '@nextui-org/react'
import NotificationsBadge from './NotificationsBadge'
import { useSession } from 'next-auth/react'
import { getInitials } from '../../utils/string'

export default function SignedInMenu() {
  const { data: session } = useSession()

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
            showFallback
            name={session?.user?.name ?? ''}
            src={session?.user?.image ?? undefined}
            className="cursor-pointer"
            getInitials={getInitials}
          />
        </Link>
      </NavbarItem>
    </>
  )
}
