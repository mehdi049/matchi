'use client'

import { QUERY_KEYS } from '@/const/query_keys'
import { getUserByEmail, getUserById } from '@/services/member'
import { UserResponse } from '@/types/User'
import { ApiResponse } from '@/types/apiResponse'
import { UseQueryResult, useQuery } from '@tanstack/react-query'

const useGetUserByEmail = (
  email: string
): UseQueryResult<ApiResponse<UserResponse>> => {
  return useQuery({
    queryKey: [QUERY_KEYS.USER_EMAIL, email],
    queryFn: async () => getUserByEmail(email),
  })
}

export default useGetUserByEmail
