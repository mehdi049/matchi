'use client'

import { QUERY_KEYS } from '@/const/query_keys'
import { getQueryClient } from '@/lib/getQueryClient'
import { addAttendance } from '@/services/attendance'
import { UserAttendanceResponse } from '@/types/UserInterestResponse'
import { useMutation } from '@tanstack/react-query'

const useAddAttendance = ({ onSuccess }: useMutationProps) => {
  return useMutation({
    mutationFn: (data: { attendance: UserAttendanceResponse }) => {
      return addAttendance(data.attendance)
    },
    onSuccess: () => {
      onSuccess ? onSuccess() : {}
      getQueryClient().invalidateQueries({ queryKey: [QUERY_KEYS.ATTENDANCES] })
    },
  })
}

export default useAddAttendance
