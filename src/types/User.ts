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
}

export type UserResponseSm = {
  id: string
  name: string
  image: string
}

export type AddedActivityResponse = {
  id?: number
  title: string
  description: string
  country: string
  city: string
  municipality: string
  place: string
  googleMap: string
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
  attendees?: UserResponseSm[]
  status: 'Active' | 'Cancelled'
  createdAt?: Date
}

export type ActivityResponse = {
  id: number
  name: string
  image: string
  status: 'Active' | 'Inactive'
}

export type UserInterestResponse = {
  activityId: number
  userId?: string
}

export type UserAttendanceResponse = {
  addedActivityId: number
  userId?: string
}
