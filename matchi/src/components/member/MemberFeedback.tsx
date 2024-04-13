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
import MemberRating from './Rating'

type MemberProps = {
  member?: unknown
}
export default function MemberFeedback({ member }: MemberProps) {
  const router = useRouter()
  return (
    <Card className="w-full mt-4">
      <CardBody>
        <div className="flex gap-2 items-end justify-between">
          <H2>Avis</H2>
          <MemberRating />
        </div>
        <div className="divide-y my-4">
          {[...Array(4).keys()].map((x, key) => {
            return (
              <div key={key} className="flex items-start gap-2 py-2">
                <div>
                  <Avatar
                    name="Jane Doe"
                    src="https://i.pravatar.cc/150?u=a04258114e29026702d"
                    onClick={() => router.push('/member/2')}
                    className="cursor-pointer"
                  />
                </div>
                <div>
                  <p className="font-bold text-xs">Mehdi Marouani</p>
                  <p className="text-xs mt-1">
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry. Lorem Ipsum has been the industry
                    standard dummy text ever since the 1500s, when an unknown
                    printer took a galley of type and
                  </p>
                </div>
              </div>
            )
          })}
        </div>
      </CardBody>
    </Card>
  )
}
