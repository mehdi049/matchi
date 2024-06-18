import { AddedActivityResponseSm } from './AddedActivityResponse'
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
}

export type UserResponseSm = {
  id: string
  name: string
  image: string
}
