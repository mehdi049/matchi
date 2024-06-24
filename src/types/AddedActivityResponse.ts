import { ActivityResponse } from './ActivityResponse'
import { UserResponseSm } from './User'
import { UserAttendanceStatus } from './UserAttendanceResponse'

type AddedActivityResponseAttendee = {
  user: UserResponseSm
}
export type AddedActivityStatus = 'Active' | 'Cancelled'
export type AddedActivityType = 'Private' | 'Public'

export type AddedActivityResponse = {
  id?: number
  title: string
  description: string
  country: string
  city: string
  municipality: string
  place: string
  googleMap?: string
  date: Date
  start: Date
  end: Date
  maxAttendees?: number
  price?: number
  currency: string
  type: AddedActivityType
  status: AddedActivityStatus
  createdAt?: Date

  activity?: ActivityResponse
  activityId?: number

  attendees?: AddedActivityResponseAttendee[]

  createdBy?: UserResponseSm
  userId?: string
}

export type AddedActivityResponseSm = {
  id?: number
  title: string
  country: string
  city: string
  municipality: string
  place: string
  date: Date
  start: Date
  end: Date
  activity?: ActivityResponse
  activityId?: number
  maxAttendees?: number
  attendees?: AddedActivityResponseAttendee[]
  status: AddedActivityStatus
  createdAt?: Date
  createdBy?: UserResponseSm
}
