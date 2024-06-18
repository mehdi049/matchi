import { ActivityResponse } from './ActivityResponse'
import { UserResponseSm } from './User'

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
  type: 'Private' | 'Public'
  status: 'Active' | 'Cancelled'
  createdAt?: Date

  activity?: ActivityResponse
  activityId?: number

  attendees?: UserResponseSm[]

  createdBy?: UserResponseSm
  userId?: string
}

export type AddedActivityResponseSm = {
  id?: number
  title: string
  place: string
  date: Date
  start: Date
  end: Date
  activity?: ActivityResponse
  activityId?: number
  maxAttendees?: number
  attendees?: UserResponseSm[]
  status: 'Active' | 'Cancelled'
  createdAt?: Date
  createdBy?: UserResponseSm
}
