export type UserAttendanceRequestStatus =
  | 'Accepted'
  | 'Rejected'
  | 'Cancelled'
  | 'Pending'

export type UserAttendanceResponse = {
  addedActivityId: number
  userId?: string
  status?: UserAttendanceRequestStatus
  statusUpdatedAt?: Date
}
