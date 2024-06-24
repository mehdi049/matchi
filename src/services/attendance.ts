import { API_ROUTES } from '@/const/api_routes'
import { fetcher } from '@/lib/fetcher'
import { UserAttendanceResponse } from '@/types/UserInterestResponse'

export const addAttendance = (attendance: UserAttendanceResponse) => {
  return fetcher<string>({
    url: API_ROUTES.ATTENDANCE.ADD,
    method: 'POST',
    body: attendance as unknown as BodyInit,
  })
}
