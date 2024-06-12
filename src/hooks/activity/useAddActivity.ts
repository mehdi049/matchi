'use client'

import { QUERY_KEYS } from '@/const'
import { getQueryClient } from '@/lib/getQueryClient'
import { addActivity } from '@/services/activity'
import { AddedActivityResponse } from '@/types/User'
import { useMutation } from '@tanstack/react-query'

const useAddActivity = ({ onSuccess }: useMutationProps) => {
  return useMutation({
    mutationFn: (data: { activity: AddedActivityResponse }) => {
      return addActivity(data.activity)
    },
    onSuccess: () => {
      onSuccess ? onSuccess() : {}
      getQueryClient().invalidateQueries({ queryKey: [QUERY_KEYS.ACTIVITIES] })
    },
  })
}

export default useAddActivity
