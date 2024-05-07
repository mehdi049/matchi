'use client'

import React from 'react'
import { Link } from '@nextui-org/react'
import FontAwesome from '../fontAwesome/FontAwesome'
import {
  faAddressBook,
  faComments,
  faHeart,
  faPaperPlane,
  faUser,
} from '@fortawesome/free-regular-svg-icons'
import {
  faArrowRightFromBracket,
  faPlus,
} from '@fortawesome/free-solid-svg-icons'
import { signOut } from 'next-auth/react'
import { ROUTES } from '@/routes'

export default function SidebarMobileMember() {
  const handleSignOut = () => {
    signOut({ callbackUrl: ROUTES.HOME, redirect: true })
  }
  return (
    <div className="flex w-full px-4 items-center justify-between bg-gray-100 border-t border-t-gray-300 divide-x divide-gray-200">
      <Link
        href="/member/activities/add"
        className="flex gap-1 flex-col text-xs text-center grow py-2"
        color="foreground"
      >
        <FontAwesome size="lg" icon={faPlus} />
      </Link>

      <Link
        href="/member/activities"
        className="bg-gray-200 flex gap-1 flex-col text-xs text-center grow py-2"
        color="foreground"
      >
        <FontAwesome size="lg" icon={faHeart} />
      </Link>
      <Link
        href="/member/requests"
        className="flex gap-1 flex-col text-xs text-center grow py-2"
        color="foreground"
      >
        <FontAwesome size="lg" icon={faPaperPlane} />
      </Link>
      <Link
        href="/member/reviews"
        className="flex gap-1 flex-col text-xs text-center grow py-2"
        color="foreground"
      >
        <FontAwesome size="lg" icon={faComments} />
      </Link>
      <Link
        href="/member/profile"
        className="flex gap-1 flex-col text-xs text-center grow py-2"
        color="foreground"
      >
        <FontAwesome size="lg" icon={faUser} />
      </Link>
      <Link
        href="/member/account"
        className="flex gap-1 flex-col text-xs text-center grow py-2"
        color="foreground"
      >
        <FontAwesome size="lg" icon={faAddressBook} />
      </Link>

      <Link
        onClick={handleSignOut}
        className="text-danger flex gap-1 flex-col text-xs text-center grow py-2"
        color="danger"
      >
        <FontAwesome size="lg" icon={faArrowRightFromBracket} />
      </Link>
    </div>
  )
}
