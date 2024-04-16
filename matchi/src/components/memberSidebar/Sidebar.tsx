'use client'

import React from 'react'
import { Listbox, ListboxItem } from '@nextui-org/react'
import FontAwesome from '../fontAwesome/FontAwesome'
import { faEdge } from '@fortawesome/free-brands-svg-icons'

export default function SidebarMember() {
  return (
    <Listbox
      aria-label="User Menu"
      onAction={(key) => alert(key)}
      className="p-0 gap-0 divide-y divide-default-300/50 dark:divide-default-100/80 bg-content1 max-w-[300px] overflow-visible shadow-small rounded-medium"
      itemClasses={{
        base: 'px-3 first:rounded-t-medium last:rounded-b-medium rounded-none gap-3 h-12 data-[hover=true]:bg-default-100/80',
      }}
    >
      <ListboxItem key="issues" startContent={<FontAwesome icon={faEdge} />}>
        Issues
      </ListboxItem>
      <ListboxItem
        key="pull_requests"
        startContent={<FontAwesome icon={faEdge} />}
      >
        Pull Requests
      </ListboxItem>
      <ListboxItem
        key="discussions"
        startContent={<FontAwesome icon={faEdge} />}
      >
        Discussions
      </ListboxItem>
      <ListboxItem key="actions" startContent={<FontAwesome icon={faEdge} />}>
        Actions
      </ListboxItem>
      <ListboxItem key="projects" startContent={<FontAwesome icon={faEdge} />}>
        Projects
      </ListboxItem>
    </Listbox>
  )
}
