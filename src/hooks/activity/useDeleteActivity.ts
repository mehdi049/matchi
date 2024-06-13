'use client'

import { QUERY_KEYS } from '@/const'
import { getQueryClient } from '@/lib/getQueryClient'
import { deleteActivity } from '@/services/activity'
import { useMutation } from '@tanstack/react-query'

const useDeleteActivity = ({ onSuccess }: useMutationProps) => {
  return useMutation({
    mutationFn: (data: { id: number }) => {
      return deleteActivity(data.id)
    },
    onSuccess: () => {
      onSuccess ? onSuccess() : {}
      getQueryClient().invalidateQueries({ queryKey: [QUERY_KEYS.ACTIVITIES] })
    },
  })
}

export default useDeleteActivity
