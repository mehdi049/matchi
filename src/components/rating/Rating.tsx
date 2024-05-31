'use client'

import FontAwesome from '../fontAwesome/FontAwesome'
import { faStar, faStarHalf } from '@fortawesome/free-solid-svg-icons'
import { faStar as faStarEmpty } from '@fortawesome/free-regular-svg-icons'
import { SizeProp } from '@fortawesome/fontawesome-svg-core'

type RatingProps = {
  size?: SizeProp
}
export default function Rating({ size = 'lg' }: RatingProps) {
  return (
    <div className="flex gap-0 text-yellow-300">
      <FontAwesome icon={faStar} size={size} />
      <FontAwesome icon={faStar} size={size} />
      <FontAwesome icon={faStar} size={size} />
      <FontAwesome icon={faStarHalf} size={size} />
      <FontAwesome icon={faStarEmpty} size={size} />
    </div>
  )
}
