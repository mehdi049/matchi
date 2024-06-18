import { API_ROUTES } from '@/const/api_routes'
import { fetcherGet } from '@/lib/fetcher'
import { ActivityResponse } from '@/types/ActivityResponse'

export const getInterests = () => {
  return fetcherGet<ActivityResponse[]>({
    url: API_ROUTES.INTERESTS.GET_ALL,
  })
}

export const getInterestBySlug = (slug: string) => {
  return fetcherGet<ActivityResponse>({
    url: API_ROUTES.INTERESTS.GET_BY_SLUG(slug),
  })
}
