'use client'

import React from 'react'
import { Listbox, ListboxItem } from '@nextui-org/react'
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
import { useRouter } from 'next/navigation'
import { signOut } from 'next-auth/react'
import { ROUTES } from '@/routes'

export default function SidebarMember() {
  const router = useRouter()
  const handleSignOut = () => {
    signOut({ callbackUrl: ROUTES.HOME, redirect: true })
  }
  return (
    <Listbox
      variant="flat"
      aria-label="Member sidebar"
      onAction={(key) =>
        key === 'logout' ? handleSignOut() : router.push('/member/' + key)
      }
      className="bg-content1 max-w-[300px] overflow-visible shadow-small md:rounded-medium"
      itemClasses={{
        base: 'px-3 rounded-none gap-3 h-12',
      }}
    >
      <ListboxItem
        key="activities/add"
        className="text-primary"
        color="primary"
        startContent={<FontAwesome icon={faPlus} />}
        showDivider
      >
        Créer une activité
      </ListboxItem>

      <ListboxItem
        key="activities"
        startContent={<FontAwesome icon={faHeart} />}
      >
        Mes activités
      </ListboxItem>
      <ListboxItem
        key="requests"
        startContent={<FontAwesome icon={faPaperPlane} />}
      >
        Mes demandes
      </ListboxItem>
      <ListboxItem
        key="reviews"
        showDivider
        startContent={<FontAwesome icon={faComments} />}
      >
        Avis
      </ListboxItem>

      <ListboxItem key="profile" startContent={<FontAwesome icon={faUser} />}>
        Mon profil
      </ListboxItem>
      <ListboxItem
        key="account"
        showDivider
        startContent={<FontAwesome icon={faAddressBook} />}
      >
        Mon compte
      </ListboxItem>

      <ListboxItem
        key="logout"
        className="text-danger"
        color="danger"
        startContent={<FontAwesome icon={faArrowRightFromBracket} />}
      >
        Me déconnecter
      </ListboxItem>
    </Listbox>
  )
}
