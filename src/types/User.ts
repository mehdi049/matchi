import { AddedActivityResponseSm } from './AddedActivityResponse'
import { UserAttendanceResponse } from './UserAttendanceResponse'
import { UserInterestResponse } from './UserInterestResponse'

export type UserResponse = {
  id: string
  name: string
  email: string
  image: string
  birthDay: Date
  bio: string
  gender: string
  country: string
  city: string
  municipality: string
  createdAt: Date
  updatedAt: Date

  addedActivities?: AddedActivityResponseSm[]
  interests?: UserInterestResponse[]
  userAttendance?: UserAttendanceResponse[]
}

export type UserResponseSm = {
  id: string
  name: string
  image: string
  userAttendance?: UserAttendanceResponse[]
}
