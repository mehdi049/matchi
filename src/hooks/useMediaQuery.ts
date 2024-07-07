import { useLayoutEffect, useState } from 'react'

type MediaSizeProps = 'mobile' | 'tablet'
const useMediaQuery = (size: MediaSizeProps) => {
  let sizePx = 0
  switch (size) {
    case 'mobile':
      sizePx = 640
      break
    case 'tablet':
      sizePx = 768
      break

    default:
      break
  }
  const [match, setMatch] = useState([
    typeof window !== 'undefined' ? window.innerWidth <= sizePx : null,
  ])

  useLayoutEffect(() => {
    const listener = () => {
      setMatch([window.innerWidth <= sizePx])
    }
    window.addEventListener('resize', listener)
    listener()
    return () => window.removeEventListener('resize', listener)
  }, [])

  return match
}

export default useMediaQuery
