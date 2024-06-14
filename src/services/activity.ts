import { API_ROUTES } from '@/const'
import { AddedActivityUpdateStatus } from '@/hooks/activity/useUpdateActivity'
import { fetcher, fetcherGet } from '@/lib/fetcher'
import { AddedActivityResponse } from '@/types/User'

export const addActivity = (activity: AddedActivityResponse) => {
  return fetcher<string>({
    url: API_ROUTES.ACTIVITY.ADD_ACTIVITY,
    method: 'POST',
    body: activity as unknown as BodyInit,
  })
}

export const updateActivity = (
  id: number,
  activity: AddedActivityResponse | AddedActivityUpdateStatus
) => {
  return fetcher<string>({
    url: API_ROUTES.ACTIVITY.GET_BY_ID(id),
    method: 'PUT',
    body: activity as unknown as BodyInit,
  })
}

export const deleteActivity = (id: number) => {
  return fetcher<string>({
    url: API_ROUTES.ACTIVITY.GET_BY_ID(id),
    method: 'DELETE',
  })
}

export const getActivityById = (id: number) => {
  return fetcherGet<AddedActivityResponse>({
    url: API_ROUTES.ACTIVITY.GET_BY_ID(id),
  })
}

export const getActivitiesByUserId = (id: string) => {
  return fetcherGet<AddedActivityResponse[]>({
    url: API_ROUTES.ACTIVITY.GET_BY_USER_ID(id),
  })
}
