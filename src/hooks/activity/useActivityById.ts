'use client'

import { QUERY_KEYS } from '@/const'
import { getActivityById } from '@/services/activity'
import { ApiResponse } from '@/types/apiResponse'
import { AddedActivity } from '@prisma/client'
import { UseQueryResult, useQuery } from '@tanstack/react-query'

const useActivityById = (
  id: number
): UseQueryResult<ApiResponse<AddedActivity>> => {
  return useQuery({
    queryKey: [QUERY_KEYS.ACTIVITIES, id],
    queryFn: async () => getActivityById(id),
  })
}

export default useActivityById
