import { API_ROUTES } from '@/const'
import { fetcherGet } from '@/lib/fetcher'
import { ActivityResponse } from '@/types/User'

export const getInterests = () => {
  return fetcherGet<ActivityResponse[]>({
    url: API_ROUTES.INTERESTS,
  })
}
