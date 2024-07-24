import { API_ROUTES } from '@/const/api_routes'
import { fetcher, fetcherGet } from '@/lib/fetcher'
import { NotificationResponse } from '@/types/NotificationResponse'

export const getNotificationsByUserId = (id: string) => {
  return fetcherGet<NotificationResponse[]>({
    url: API_ROUTES.NOTIFICATIONS.GET_BY_USER_ID(id),
  })
}

export const deleteNotification = (id: number) => {
  return fetcher<string>({
    method: 'DELETE',
    url: API_ROUTES.NOTIFICATIONS.GET_BY_ID(id),
  })
}
