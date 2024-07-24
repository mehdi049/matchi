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
import useGetNotificationsByUserId from '@/hooks/notifications/useGetNotificationsByUserId'
import { useContext } from 'react'
import { UserContext } from '@/app/member/context/UserContext'
import IsLoadingMessage from '../message/IsLoadingMessage'

export default function NotificationsBadge() {
  const { user } = useContext(UserContext)
  const { data, isPending } = useGetNotificationsByUserId(user.id)

  return (
    <>
      <NavbarItem>
        {isPending ? (
          <IsLoadingMessage type="only-loading-icon" />
        ) : (
          <Badge
            size="sm"
            content={
              data?.body && data?.body?.length > 0 ? (
                <>+{data?.body?.length}</>
              ) : (
                <>+0</>
              )
            }
            color="danger"
          >
            <Dropdown>
              <DropdownTrigger>
                <span className="cursor-pointer pt-2 sm:pt-1 text-xs sm:text-base">
                  Notifications
                </span>
              </DropdownTrigger>

              <DropdownMenu
                aria-label="Notifications"
                className=" max-h-96 overflow-scroll "
                closeOnSelect={false}
              >
                {data?.body && data?.body?.length > 0 ? (
                  data.body.map((notification) => (
                    <DropdownItem
                      variant="light"
                      key={notification.id}
                      className="max-w-xs"
                    >
                      <NotificationItem notification={notification} />
                    </DropdownItem>
                  ))
                ) : (
                  <DropdownItem variant="light" className="max-w-xs">
                    Aucune notification reçu
                  </DropdownItem>
                )}
              </DropdownMenu>
            </Dropdown>
          </Badge>
        )}
      </NavbarItem>
    </>
  )
}
