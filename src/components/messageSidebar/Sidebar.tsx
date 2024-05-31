'use client'

import React, { useMemo, useState } from 'react'
import {
  Avatar,
  Chip,
  Listbox,
  ListboxItem,
  ScrollShadow,
} from '@nextui-org/react'
import users from '../../data/users.json'

export default function SidebarMemberMessage() {
  const [value, setValue] = useState(1)

  const topContent = useMemo(() => {
    if (!value) return null

    return (
      <ScrollShadow
        hideScrollBar
        className="w-full flex py-0.5 px-2 gap-1"
        orientation="horizontal"
      >
        <Chip key={value}>
          {users.find((user) => `${user.id}` === `${value}`)?.name}
        </Chip>
      </ScrollShadow>
    )
  }, [value])

  return (
    <Listbox
      topContent={topContent}
      classNames={{
        base: 'bg-content1 max-w-[300px] overflow-visible shadow-small rounded-medium',
        list: 'max-h-[300px] overflow-scroll',
      }}
      items={users}
      variant="flat"
      onAction={(e) => setValue(e as number)}
    >
      {(item) => (
        <ListboxItem key={item.id} textValue={item.name}>
          <div className="flex gap-2 items-center">
            <Avatar
              alt={item.name}
              className="flex-shrink-0"
              size="sm"
              src={item.avatar}
            />
            <div className="flex flex-col">
              <span className="text-small">{item.name}</span>
              <span className="text-tiny text-default-400">{item.email}</span>
            </div>
          </div>
        </ListboxItem>
      )}
    </Listbox>
  )
}
