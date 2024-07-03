'use client'

import { QUERY_KEYS } from '@/const/query_keys'
import { getQueryClient } from '@/lib/getQueryClient'
import { updateAttendance } from '@/services/attendance'
import { UserAttendanceRequestStatus } from '@/types/UserAttendanceResponse'
import { useMutation } from '@tanstack/react-query'

const useUpdateAttendance = ({ onSuccess }: useMutationProps) => {
  return useMutation({
    mutationFn: (data: {
      userId: string
      activityId: number
      status: UserAttendanceRequestStatus
    }) => {
      return updateAttendance(data.userId, data.activityId, data.status)
    },
    onSuccess: () => {
      onSuccess ? onSuccess() : {}
      getQueryClient().invalidateQueries({ queryKey: [QUERY_KEYS.ATTENDANCES] })
    },
  })
}

export default useUpdateAttendance
