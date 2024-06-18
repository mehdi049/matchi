'use client'

import { QUERY_KEYS } from '@/const/query_keys'
import { getUserById } from '@/services/member'
import { UserResponse } from '@/types/User'
import { ApiResponse } from '@/types/apiResponse'
import { UseQueryResult, useQuery } from '@tanstack/react-query'

const useGetUserById = (
  id: string
): UseQueryResult<ApiResponse<UserResponse>> => {
  return useQuery({
    queryKey: [QUERY_KEYS.USER_ID, id],
    queryFn: async () => getUserById(id),
  })
}

export default useGetUserById
