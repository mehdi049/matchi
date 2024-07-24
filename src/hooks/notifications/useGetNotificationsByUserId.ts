'use client'

import { QUERY_KEYS } from '@/const/query_keys'
import { getNotificationsByUserId } from '@/services/notifications'
import { ApiResponse } from '@/types/apiResponse'
import { NotificationResponse } from '@/types/NotificationResponse'
import { UseQueryResult, useQuery } from '@tanstack/react-query'

const useGetNotificationsByUserId = (
  userId: string
): UseQueryResult<ApiResponse<NotificationResponse[]>> => {
  return useQuery({
    queryKey: [QUERY_KEYS.NOTIFICATIONS_BY_USER, userId],
    queryFn: async () => getNotificationsByUserId(userId),
  })
}

export default useGetNotificationsByUserId
