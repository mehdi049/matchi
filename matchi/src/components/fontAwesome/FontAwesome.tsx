'use client'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { IconDefinition } from '@fortawesome/free-solid-svg-icons'
import { SizeProp } from '@fortawesome/fontawesome-svg-core'

type FontAwesomeProps = {
  icon: IconDefinition
  size?: SizeProp
  className?: string
}
export default function FontAwesome({
  icon,
  size = 'xs',
  className,
}: FontAwesomeProps) {
  return <FontAwesomeIcon icon={icon} className={className} size={size} />
}
