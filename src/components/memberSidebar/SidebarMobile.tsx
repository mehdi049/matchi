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

const menu = [
  {
    url: ROUTES.MEMBER.ADD_ACTIVITY,
    icon: faPlus,
  },
  {
    url: ROUTES.MEMBER.MY_ACTIVITIES,
    icon: faHeart,
  },
  {
    url: ROUTES.MEMBER.MY_REQUESTS,
    icon: faPaperPlane,
  },
  {
    url: ROUTES.MEMBER.MY_REVIEWS,
    icon: faComments,
  },
  {
    url: ROUTES.MEMBER.PROFILE,
    icon: faUser,
  },
  {
    url: ROUTES.MEMBER.ACCOUNT,
    icon: faAddressBook,
  },
]
export default function SidebarMobileMember() {
  const handleSignOut = () => {
    signOut({ callbackUrl: ROUTES.HOME, redirect: true })
  }

  return (
    <div className="flex w-full px-4 items-center justify-between bg-white border-t border-t-gray-100 divide-x divide-gray-100">
      {menu.map((item, i) => {
        return (
          <Link
            key={i}
            href={item.url}
            className="flex gap-1 flex-col text-xs text-center grow py-4"
            color="foreground"
          >
            <FontAwesome size="xl" icon={item.icon} />
          </Link>
        )
      })}

      <Link
        onClick={handleSignOut}
        className="text-danger flex gap-1 flex-col text-xs text-center grow py-4"
        color="danger"
      >
        <FontAwesome size="xl" icon={faArrowRightFromBracket} />
      </Link>
    </div>
  )
}
