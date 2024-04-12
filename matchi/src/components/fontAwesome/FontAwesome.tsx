'use client'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { IconDefinition } from '@fortawesome/free-solid-svg-icons'

type FontAwesomeProps = {
  icon: IconDefinition
  className?: string
}
export default function FontAwesome({ icon, className }: FontAwesomeProps) {
  return <FontAwesomeIcon icon={icon} className={className} />
}
