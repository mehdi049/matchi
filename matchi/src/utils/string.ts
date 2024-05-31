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
