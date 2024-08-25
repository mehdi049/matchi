'use client'

import { Avatar, Badge, Link, NavbarItem, Button } from '@nextui-org/react'
import NotificationsBadge from './NotificationsBadge'
import { getInitials } from '../../utils/string'
import { useContext } from 'react'
import { UserContext } from '@/app/member/context/UserContext'
import { useRouter } from 'next/navigation'
import { ROUTES } from '@/routes'
import FontAwesome from '../fontAwesome/FontAwesome'
import { faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons'
import { signOut } from 'next-auth/react'

export default function SignedInMenu() {
  const router = useRouter()
  const { user } = useContext(UserContext)
  const basicInfoSet = !(
    !user?.birthDay ||
    !user?.city ||
    !user?.municipality ||
    user?.interests?.length === 0
  )

  return (
    <>
      {basicInfoSet ? (
        <>
          <NavbarItem>
            <NotificationsBadge />
          </NavbarItem>
          <NavbarItem>
            <Badge size="sm" content="+5" color="danger">
              <Link
                onClick={() => router.push(ROUTES.MEMBER.MESSAGES)}
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
      ) : (
        <NavbarItem>
          <Button
            variant="ghost"
            color="danger"
            size="sm"
            startContent={<FontAwesome icon={faArrowRightFromBracket} />}
            onClick={() => {
              signOut({ callbackUrl: ROUTES.HOME, redirect: true })
            }}
          >
            Me déconnecter
          </Button>
        </NavbarItem>
      )}
    </>
  )
}
