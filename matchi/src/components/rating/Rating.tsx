'use client'

import FontAwesome from '../fontAwesome/FontAwesome'
import { faStar, faStarHalf } from '@fortawesome/free-solid-svg-icons'
import { faStar as faStarEmpty } from '@fortawesome/free-regular-svg-icons'

export default function Rating() {
  return (
    <div className="flex gap-0 text-yellow-300">
      <FontAwesome icon={faStar} size="lg" />
      <FontAwesome icon={faStar} size="lg" />
      <FontAwesome icon={faStar} size="lg" />
      <FontAwesome icon={faStarHalf} size="lg" />
      <FontAwesome icon={faStarEmpty} size="lg" />
    </div>
  )
}
