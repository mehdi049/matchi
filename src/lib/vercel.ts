import { API_ROUTES } from '@/const'
import { validateImage } from '@/utils/validation'
import { upload } from '@vercel/blob/client'

export const uploadMediaImage = async (file: File) => {
  validateImage(file)

  try {
    const response = await upload(file.name, file, {
      access: 'public',
      handleUploadUrl: API_ROUTES.UPLOAD,
    })
    return response
  } catch (error) {
    throw Error('Une erreur est survenu, veuillez réessayer plus tard')
  }
}
