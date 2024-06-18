'use client'

import { Avatar, Badge, Link, NavbarItem } from '@nextui-org/react'
import NotificationsBadge from './NotificationsBadge'
import { getInitials } from '../../utils/string'
import { useContext } from 'react'
import { UserContext } from '@/app/member/context/UserContext'
import { useRouter } from 'next/navigation'
import { ROUTES } from '@/routes'

export default function SignedInMenu() {
  const router = useRouter()
  const { user } = useContext(UserContext)

  return (
    <>
      <NavbarItem>
        <NotificationsBadge />
      </NavbarItem>
      <NavbarItem>
        <Badge size="sm" content="+5" color="danger">
          <Link
            onClick={() => {
              router.push(ROUTES.MEMBER.MESSAGES)
            }}
            color="foreground"
            className="cursor-pointer pt-2 sm:pt-1 text-xs sm:text-base"
          >
            Messages
          </Link>
        </Badge>
      </NavbarItem>
      <NavbarItem>
        <Link
          onClick={() => router.push(ROUTES.MEMBER.PROFILE)}
          color="foreground"
          className="cursor-pointer"
        >
          <Avatar
            showFallback
            name={user?.name ?? ''}
            src={user?.image ?? undefined}
            className="cursor-pointer"
            getInitials={getInitials}
          />
        </Link>
      </NavbarItem>
    </>
  )
}
