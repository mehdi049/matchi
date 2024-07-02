'use client'

import { QUERY_KEYS } from '@/const/query_keys'
import { getInactiveActivities } from '@/services/activity'
import { AddedActivityResponse } from '@/types/AddedActivityResponse'
import { ApiResponse } from '@/types/apiResponse'
import { UseQueryResult, useQuery } from '@tanstack/react-query'

const useGetInactiveActivities = (): UseQueryResult<
  ApiResponse<AddedActivityResponse[]>
> => {
  return useQuery({
    queryKey: [QUERY_KEYS.ACTIVITIES_INACTIVE],
    queryFn: async () => getInactiveActivities(),
  })
}

export default useGetInactiveActivities
