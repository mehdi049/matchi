'use client'

import { Avatar } from '@nextui-org/react'

export default function NotificationItem() {
  return (
    <div className="py-2 flex gap-2 justify-start hover:bg-gray-50 cursor-pointer">
      <div>
        <Avatar
          className="w-10 h-10"
          src="https://i.pravatar.cc/150?u=a042581f4e29026024d"
        />
      </div>
      <div>
        <p className="text-sm">
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry standard dummy text ever
          since the 1500s
        </p>
        <span className="block text-right text-xs text-gray-400">
          14 Juillet 2024 14:16h
        </span>
      </div>
    </div>
  )
}
