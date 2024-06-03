import { fetcher, fetcherGet } from '@/lib/fetcher'
import { RegisterUserProps } from './public'
import { API_ROUTES } from '@/const'
import { UserResponse } from '@/types/User'

export const updateUserInfo = ({
  name,
  email,
  password,
}: RegisterUserProps) => {
  return fetcher<string>({
    url: API_ROUTES.REGISTER,
    method: 'POST',
    body: { name, email, password } as unknown as BodyInit,
  })
}

export const getUserById = (id: string) => {
  return fetcherGet<UserResponse>({
    url: API_ROUTES.USER.GET_BY_ID(id),
  })
}

export const getUserByEmail = (email: string) => {
  return fetcherGet<UserResponse>({
    url: API_ROUTES.USER.GET_BY_EMAIL(email),
  })
}
