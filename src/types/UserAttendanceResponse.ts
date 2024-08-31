export enum ATTENDANCE_STATUS {
  ACCEPTED = 'Accepted',
  REJECTED = 'Rejected',
  CANCELLED = 'Cancelled',
  PENDING = 'Pending',
}

export type UserAttendanceRequestStatus =
  | ATTENDANCE_STATUS.ACCEPTED
  | ATTENDANCE_STATUS.REJECTED
  | ATTENDANCE_STATUS.CANCELLED
  | ATTENDANCE_STATUS.PENDING

export type UserAttendanceResponse = {
  addedActivityId: number
  userId?: string
  status?: UserAttendanceRequestStatus
  statusUpdatedAt?: Date
}
