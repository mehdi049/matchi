'use client'

import { QUERY_KEYS } from '@/const/query_keys'
import { getActiveActivities } from '@/services/activity'
import { AddedActivityResponse } from '@/types/AddedActivityResponse'
import { ApiResponse } from '@/types/apiResponse'
import { UseQueryResult, useQuery } from '@tanstack/react-query'

const useGetActiveActivities = (): UseQueryResult<
  ApiResponse<AddedActivityResponse[]>
> => {
  return useQuery({
    queryKey: [QUERY_KEYS.ACTIVITIES],
    queryFn: async () => getActiveActivities(),
  })
}

export default useGetActiveActivities
