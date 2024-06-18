'use client'

import { QUERY_KEYS } from '@/const/query_keys'
import { getActiveActivitiesByType } from '@/services/activity'
import { AddedActivityResponse } from '@/types/AddedActivityResponse'
import { ApiResponse } from '@/types/apiResponse'
import { UseQueryResult, useQuery } from '@tanstack/react-query'

const useGetActiveActivitiesByType = (
  activityId: number
): UseQueryResult<ApiResponse<AddedActivityResponse[]>> => {
  return useQuery({
    queryKey: [QUERY_KEYS.ACTIVITIES, activityId],
    queryFn: async () => getActiveActivitiesByType(activityId),
  })
}

export default useGetActiveActivitiesByType
