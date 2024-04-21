'use client'

import {
  Badge,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  NavbarItem,
} from '@nextui-org/react'
import NotificationItem from '../notifications/NotificationItem'

export default function NotificationsBadge() {
  return (
    <>
      <NavbarItem>
        <Badge size="sm" content="+12" color="danger">
          <Dropdown>
            <DropdownTrigger>
              <span className="cursor-pointer pt-2 sm:pt-1 text-xs sm:text-base">
                Notifications
              </span>
            </DropdownTrigger>
            <DropdownMenu
              aria-label="Notifications"
              className=" max-h-96 overflow-scroll "
            >
              {[...Array(20).keys()].map((x, key) => {
                return (
                  <DropdownItem variant="light" key={key} className="max-w-xs">
                    <NotificationItem />
                  </DropdownItem>
                )
              })}
            </DropdownMenu>
          </Dropdown>
        </Badge>
      </NavbarItem>
    </>
  )
}
