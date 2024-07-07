import { ROUTES } from '@/routes'
import {
  AddedActivityResponse,
  AddedActivityResponseSm,
} from '@/types/AddedActivityResponse'
import { extractHourFromDate, fullDate } from '@/utils/date'
import { User } from '@nextui-org/react'
import { useRouter } from 'next/navigation'

type ActivityCardHorizontalProps = {
  activity: AddedActivityResponse | AddedActivityResponseSm
}
export const ActivityCardHorizontal = ({
  activity,
}: ActivityCardHorizontalProps) => {
  const router = useRouter()
  return (
    <div
      key={activity.id}
      className="flex gap-2 py-2 justify-between hover:bg-gray-100 duration-100 cursor-pointer px-1.5"
      onClick={() => {
        router.push(ROUTES.ACTIVITY(activity.id as number))
      }}
    >
      <User
        name={activity.createdBy?.name}
        description={`${activity.attendees?.length} ${
          activity.maxAttendees ? '/ ' + activity.maxAttendees : ''
        } participant(s)`}
        avatarProps={{
          src: activity?.createdBy?.image,
        }}
      />
      <div className="w-1/2">
        <p>
          <strong className="text-xs">{activity.activity?.name}</strong>
          <span className="text-xs"> / {activity.place}</span>
        </p>
        <p className="text-xs">
          {fullDate(activity.date)}
          <br /> {extractHourFromDate(activity.start)}h-
          {extractHourFromDate(activity.end)}h
        </p>
      </div>
    </div>
  )
}
