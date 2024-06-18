'use client'

import { QUERY_KEYS } from '@/const'
import { getQueryClient } from '@/lib/getQueryClient'
import { updateActivity } from '@/services/activity'
import { AddedActivityResponse } from '@/types/AddedActivityResponse'
import { useMutation } from '@tanstack/react-query'

export type AddedActivityUpdateStatus = {
  status: 'Active' | 'Cancelled'
  activityId: number
}

const useUpdateActivity = ({ onSuccess }: useMutationProps) => {
  return useMutation({
    mutationFn: (data: {
      id: number
      activity: AddedActivityResponse | AddedActivityUpdateStatus
    }) => {
      return updateActivity(data.id, data.activity)
    },
    onSuccess: () => {
      onSuccess ? onSuccess() : {}
      getQueryClient().invalidateQueries({ queryKey: [QUERY_KEYS.ACTIVITIES] })
    },
  })
}

export default useUpdateActivity
