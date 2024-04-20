'use client'

import ReviewListItem from './ReviewListItem'

export default function ReviewList() {
  return (
    <div className="flex flex-col divide-y divide-gray-100">
      {[...Array(20).keys()].map((x, key) => {
        return <ReviewListItem key={key} />
      })}
    </div>
  )
}
