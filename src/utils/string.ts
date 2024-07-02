import { DEFAULT_AVATAR } from '@/const/const'
import { SHA256 } from 'crypto-js'

export const getInitials = (name: string) => {
  if (name && name.split(' ').length >= 2)
    return `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`.toUpperCase()
  return name
}

export const hashPassword = (pwd: string) => {
  if (pwd) return SHA256(pwd).toString()

  return null
}

export const slugifyString = (string: string | undefined) => {
  if (string) return string.replace(' ', '-').toLowerCase()

  return undefined
}

export const unSlugifyString = (string: string | undefined) => {
  if (string) return string.replace('-', ' ')

  return undefined
}

export const capitalizeFirstLetter = (string: string | undefined) => {
  if (string) return string.charAt(0).toUpperCase() + string.slice(1)
  return undefined
}

export const generateImageUrlForUser = (
  image: string | undefined,
  gender: string
) => {
  if (image) return image

  if (gender === 'Male') return DEFAULT_AVATAR.MALE

  return DEFAULT_AVATAR.FEMALE
}
