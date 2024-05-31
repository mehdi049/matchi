import { fetcher } from '@/lib/fetcher'
import { RegisterUserProps } from './public'
import { API_ROUTES } from '@/const'

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
