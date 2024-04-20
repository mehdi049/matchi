'use client'

import NotificationListItem from './NotificationListItem'

export default function NotificationList() {
  return (
    <div className="flex flex-col divide-y divide-gray-100">
      {[...Array(20).keys()].map((x, key) => {
        return <NotificationListItem key={key} />
      })}
    </div>
  )
}
