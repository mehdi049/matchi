import { API_ROUTES } from '@/const'
import { fetcher, fetcherGet } from '@/lib/fetcher'
import { AddedActivityResponse } from '@/types/User'

export const addActivity = (activity: AddedActivityResponse) => {
  return fetcher<string>({
    url: API_ROUTES.ACTIVITY.UPSERT_ACTIVITY,
    method: 'POST',
    body: activity as unknown as BodyInit,
  })
}

export const getActivityById = (id: number) => {
  return fetcherGet<AddedActivityResponse>({
    url: API_ROUTES.ACTIVITY.GET_BY_ID(id),
  })
}
