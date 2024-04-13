'use client'

import {
  Image,
  User,
  CardBody,
  Card,
  Chip,
  Avatar,
  Divider,
  Badge,
} from '@nextui-org/react'
import H2 from '../typography/H2'
import H1 from '../typography/H1'
import { useRouter } from 'next/navigation'
import FontAwesome from '../fontAwesome/FontAwesome'
import { faStar, faStarHalf } from '@fortawesome/free-solid-svg-icons'
import { faStar as faStarEmpty } from '@fortawesome/free-regular-svg-icons'

type MemberProps = {
  member?: unknown
}
export default function MemberRating({ member }: MemberProps) {
  const router = useRouter()
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
