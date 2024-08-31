import { ActivityResponse } from './ActivityResponse'
import { UserResponseSm } from './User'

type AddedActivityResponseAttendee = {
  user: UserResponseSm
}
export enum ADDED_ACTIVITY_STATUS {
  ACTIVE = 'Active',
  CANCELLED = 'Cancelled',
}
export type AddedActivityStatus =
  | ADDED_ACTIVITY_STATUS.ACTIVE
  | ADDED_ACTIVITY_STATUS.CANCELLED

export enum ADDED_ACTIVITY_TYPE {
  PUBLIC = 'Public',
  PRIVATE = 'Private',
}
export type AddedActivityType =
  | ADDED_ACTIVITY_TYPE.PUBLIC
  | ADDED_ACTIVITY_TYPE.PRIVATE

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
  type: AddedActivityType
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
