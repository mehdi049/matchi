'use client'

import { uploadMediaImage } from '@/lib/vercel'
import { useMutation } from '@tanstack/react-query'

type useUploadMediaProps = {
  onSuccess?: () => void
}
const useUploadMediaImage = ({ onSuccess }: useUploadMediaProps) => {
  return useMutation({
    mutationFn: (data: File) => {
      return uploadMediaImage(data)
    },
    onSuccess: onSuccess ? onSuccess : () => {},
  })
}

export default useUploadMediaImage
