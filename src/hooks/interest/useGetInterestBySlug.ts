'use client'

import { QUERY_KEYS } from '@/const/query_keys'
import { getInterestBySlug } from '@/services/interests'
import { ActivityResponse } from '@/types/ActivityResponse'
import { ApiResponse } from '@/types/apiResponse'
import { UseQueryResult, useQuery } from '@tanstack/react-query'

const useGetInterestBySlug = (
  slug: string
): UseQueryResult<ApiResponse<ActivityResponse>> => {
  return useQuery({
    queryKey: [QUERY_KEYS.INTERESTS, slug],
    queryFn: async () => getInterestBySlug(slug),
  })
}

export default useGetInterestBySlug
