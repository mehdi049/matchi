export type UserAttendanceStatus =
  | 'Accepted'
  | 'Rejected'
  | 'Cancelled'
  | 'Pending'

export type UserAttendanceResponse = {
  addedActivityId: number
  userId?: string
  status?: UserAttendanceStatus
  statusUpdatedAt?: Date
}
