'use client'

import { QUERY_KEYS } from '@/const/query_keys'
import { getInterests } from '@/services/interests'
import { ActivityResponse } from '@/types/ActivityResponse'
import { ApiResponse } from '@/types/apiResponse'
import { UseQueryResult, useQuery } from '@tanstack/react-query'

const useGetInterests = (): UseQueryResult<ApiResponse<ActivityResponse[]>> => {
  return useQuery({
    queryKey: [QUERY_KEYS.INTERESTS],
    queryFn: async () => getInterests(),
  })
}

export default useGetInterests
