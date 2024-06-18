'use client'

import { QUERY_KEYS } from '@/const/query_keys'
import { getActivityById } from '@/services/activity'
import { AddedActivityResponse } from '@/types/AddedActivityResponse'
import { ApiResponse } from '@/types/apiResponse'
import { UseQueryResult, useQuery } from '@tanstack/react-query'

const useGetActivityById = (
  id: number
): UseQueryResult<ApiResponse<AddedActivityResponse>> => {
  return useQuery({
    queryKey: [QUERY_KEYS.ACTIVITIES, id],
    queryFn: async () => getActivityById(id),
  })
}

export default useGetActivityById
