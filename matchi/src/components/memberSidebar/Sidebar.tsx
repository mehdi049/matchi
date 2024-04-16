'use client'

import React from 'react'
import { Badge, Chip, Listbox, ListboxItem } from '@nextui-org/react'
import FontAwesome from '../fontAwesome/FontAwesome'
import {
  faAddressBook,
  faBell,
  faHeart,
  faMessage,
  faUser,
} from '@fortawesome/free-regular-svg-icons'
import { faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons'

export default function SidebarMember() {
  return (
    <Listbox
      variant="flat"
      aria-label="User Menu"
      onAction={(key) => alert(key)}
      className="bg-content1 max-w-[300px] overflow-visible shadow-small rounded-medium hidden md:block"
      itemClasses={{
        base: 'px-3 rounded-none gap-3 h-12 data-[hover=true]:bg-default-200/80',
      }}
    >
      <ListboxItem key="profil" startContent={<FontAwesome icon={faUser} />}>
        Mon profil
      </ListboxItem>
      <ListboxItem
        key="my-account"
        showDivider
        startContent={<FontAwesome icon={faAddressBook} />}
      >
        Mon compte
      </ListboxItem>

      <ListboxItem
        key="my-activities"
        startContent={<FontAwesome icon={faHeart} />}
      >
        Mes activités
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
        showDivider
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
