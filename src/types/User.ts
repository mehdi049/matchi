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

  addedActivities?: AddedActivityResponse[]
  interests?: UserInterestResponse[]
}

export type AddedActivityResponse = {
  id: number
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
  createdAt: Date

  attendees?: UserResponse[]
  createdBy: UserResponse
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
