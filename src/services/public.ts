import { API_ROUTES } from '@/const/api_routes'
import { fetcher } from '@/lib/fetcher'
import { User } from 'next-auth'

export type RegisterUserProps = {
  name: string
  email: string
  password: string
}
export const registerUser = ({ name, email, password }: RegisterUserProps) => {
  return fetcher<string>({
    url: API_ROUTES.REGISTER,
    method: 'POST',
    body: { name, email, password } as unknown as BodyInit,
  })
}

export type LoginUserProps = {
  email: string
  password: string
}
export const loginUser = ({ email, password }: LoginUserProps) => {
  return fetcher<User>({
    url: API_ROUTES.SIGNIN,
    method: 'POST',
    body: { email, password } as unknown as BodyInit,
  })
}
