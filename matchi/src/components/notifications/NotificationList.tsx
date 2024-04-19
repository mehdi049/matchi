'use client'

import NotificationItem from './NotificationItem'

export default function NotificationList() {
  return (
    <div className="flex flex-col divide-y divide-gray-100">
      {[...Array(20).keys()].map((x, key) => {
        return <NotificationItem key={key} />
      })}
    </div>
  )
}
