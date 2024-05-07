export const getInitials = (name: string) => {
  if (name && name.split(' ').length >= 2)
    return `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`.toUpperCase()
  return name
}
