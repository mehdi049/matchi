'use client'

import { QUERY_KEYS } from '@/const'
import { getInterests } from '@/services/interests'
import { ActivityResponse } from '@/types/User'
import { ApiResponse } from '@/types/apiResponse'
import { UseQueryResult, useQuery } from '@tanstack/react-query'

const useGetInterests = (): UseQueryResult<ApiResponse<ActivityResponse[]>> => {
  return useQuery({
    queryKey: [QUERY_KEYS.INTERESTS],
    queryFn: async () => getInterests(),
  })
}

export default useGetInterests