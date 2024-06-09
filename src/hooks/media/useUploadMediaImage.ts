'use client'

import { QUERY_KEYS } from '@/const'
import { getQueryClient } from '@/lib/getQueryClient'
import { uploadMediaImage } from '@/lib/vercel'
import { useMutation } from '@tanstack/react-query'

const useUploadMediaImage = ({ onSuccess }: useMutationProps) => {
  return useMutation({
    mutationFn: (data: File) => {
      return uploadMediaImage(data)
    },
    onSuccess: () => {
      getQueryClient().invalidateQueries({ queryKey: [QUERY_KEYS.USER_ID] })
      onSuccess ? onSuccess() : {}
    },
  })
}

export default useUploadMediaImage
