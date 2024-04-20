'use client'

import { Avatar } from '@nextui-org/react'
import Rating from '../rating/Rating'
import H3 from '../typography/H3'

export default function ReviewListItem() {
  return (
    <div className="py-2 flex gap-2 justify-start hover:bg-gray-50 cursor-pointer">
      <div>
        <Avatar
          className="w-10 h-10"
          src="https://i.pravatar.cc/150?u=a042581f4e29026024d"
        />
      </div>
      <div>
        <div className="flex justify-between gap-2">
          <p className="font-bold text-xs">Football, Terrain Dalleli</p>
          <Rating />
        </div>
        <p className="text-xs mt-1">
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
