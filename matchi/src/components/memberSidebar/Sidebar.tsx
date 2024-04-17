'use client'

import React from 'react'
import { Chip, Listbox, ListboxItem } from '@nextui-org/react'
import FontAwesome from '../fontAwesome/FontAwesome'
import {
  faAddressBook,
  faBell,
  faComments,
  faHeart,
  faMessage,
  faPaperPlane,
  faUser,
} from '@fortawesome/free-regular-svg-icons'
import {
  faArrowRightFromBracket,
  faPlus,
} from '@fortawesome/free-solid-svg-icons'
import { useRouter } from 'next/navigation'

export default function SidebarMember() {
  const router = useRouter()
  return (
    <Listbox
      variant="flat"
      aria-label="User Menu"
      onAction={(key) =>
        key === 'logout' ? router.push('/') : router.push('/member/' + key)
      }
      className="bg-content1 max-w-[300px] overflow-visible shadow-small rounded-medium"
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
        key="messages"
        startContent={<FontAwesome icon={faMessage} />}
        endContent={
          <Chip size="sm" variant="flat" color="secondary">
            6
          </Chip>
        }
      >
        Messages
      </ListboxItem>
      <ListboxItem
        key="notifications"
        startContent={<FontAwesome icon={faBell} />}
        endContent={
          <Chip size="sm" variant="flat" color="secondary">
            12
          </Chip>
        }
      >
        Notifications
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
