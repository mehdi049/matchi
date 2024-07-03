import { API_ROUTES } from '@/const/api_routes'
import { fetcher } from '@/lib/fetcher'
import { UserAttendanceRequestStatus } from '@/types/UserAttendanceResponse'
import { UserAttendanceResponse } from '@/types/UserInterestResponse'

export const addAttendance = (attendance: UserAttendanceResponse) => {
  return fetcher<string>({
    url: API_ROUTES.ATTENDANCE.ADD,
    method: 'POST',
    body: attendance as unknown as BodyInit,
  })
}

export const updateAttendance = (
  userId: string,
  activityId: number,
  status: UserAttendanceRequestStatus
) => {
  return fetcher<string>({
    url: API_ROUTES.ATTENDANCE.GET_BY_ID(userId, activityId),
    method: 'PUT',
    body: {
      status: status,
    } as unknown as BodyInit,
  })
}
