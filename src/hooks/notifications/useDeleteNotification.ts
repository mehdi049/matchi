'use client'

import { UserContext } from '@/app/member/context/UserContext'
import { QUERY_KEYS } from '@/const/query_keys'
import { getQueryClient } from '@/lib/getQueryClient'
import { deleteNotification } from '@/services/notifications'
import { useMutation } from '@tanstack/react-query'
import { useContext } from 'react'

const useDeleteNotification = ({ onSuccess }: useMutationProps) => {
  const { user } = useContext(UserContext)

  return useMutation({
    mutationFn: (data: { id: number }) => {
      return deleteNotification(data.id)
    },
    onSuccess: () => {
      onSuccess ? onSuccess() : {}
      getQueryClient().invalidateQueries({
        queryKey: [QUERY_KEYS.NOTIFICATIONS_BY_USER, user.id],
      })
    },
  })
}

export default useDeleteNotification
