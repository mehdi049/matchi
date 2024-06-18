import { fetcher, fetcherGet } from '@/lib/fetcher'
import { API_ROUTES } from '@/const/api_routes'
import { UserResponse } from '@/types/User'

export const getUserById = (id: string) => {
  return fetcherGet<UserResponse>({
    url: API_ROUTES.USER.GET_BY_ID(id),
  })
}

export const updateUser = (
  id: string,
  user: UserResponse,
  updateInterests: boolean = false
) => {
  return fetcher<string>({
    url: updateInterests
      ? API_ROUTES.USER.UPDATE_USER_INTERESTS(id)
      : API_ROUTES.USER.GET_BY_ID(id),
    method: 'PUT',
    body: user as unknown as BodyInit,
  })
}

export const getUserByEmail = (email: string) => {
  if (email)
    return fetcherGet<UserResponse>({
      url: API_ROUTES.USER.GET_BY_EMAIL(email),
    })
  return null
}
