'use client'

import { updateUser } from '@/services/member'
import { UserResponse } from '@/types/User'
import { useMutation } from '@tanstack/react-query'

const useUpdateUser = ({ onSuccess }: useMutationProps) => {
  return useMutation({
    mutationFn: (data: {
      id: string
      user: UserResponse
      updateInterests?: boolean
    }) => {
      return updateUser(data.id, data.user, data.updateInterests)
    },
    onSuccess: () => {
      onSuccess ? onSuccess() : {}
    },
  })
}

export default useUpdateUser
