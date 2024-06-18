import { MAX_UPLOAD_SIZE_IMG } from '@/const/const'

const allowedFileImageExtension = ['png', 'jpg', 'jpeg', 'webp']
const getFileExtension = (filename: string) => {
  const extension = filename.split('.').pop() as string
  return extension?.toLowerCase()
}

export const validateImage = (file: File) => {
  // handle file size / extension
  if (!file) throw Error('Fichier manquant')
  else if (
    parseInt((file?.size / 1024 / 1024).toFixed(2)) >
    parseInt(MAX_UPLOAD_SIZE_IMG)
  )
    throw Error(
      'Fichier très volumineu, il ne doit pas dépasser les ' +
        parseInt(MAX_UPLOAD_SIZE_IMG) +
        'mb.'
    )
  const fileExtension = getFileExtension(file.name)
  if (!allowedFileImageExtension.includes(getFileExtension(file.name)))
    throw Error(
      `Extension .${fileExtension} non supporté, veuillez utiliser les extensions ${allowedFileImageExtension.join(
        ', '
      )}`
    )
}
