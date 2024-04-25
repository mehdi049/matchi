'use client'

import { CardBody, Card, Avatar } from '@nextui-org/react'
import H2 from '../typography/H2'
import { useRouter } from 'next/navigation'
import Rating from '../rating/Rating'

export default function ProfileFeedback() {
  const router = useRouter()
  return (
    <Card className="w-full mt-4">
      <CardBody>
        <div className="flex gap-2 items-end justify-between">
          <H2>Avis</H2>
          <Rating />
        </div>
        <div className="divide-y my-4">
          {[...Array(4).keys()].map((x, key) => {
            return (
              <div key={key} className="flex items-start gap-2 py-2">
                <div>
                  <Avatar
                    name="Jane Doe"
                    src="https://i.pravatar.cc/150?u=a04258114e29026702d"
                    onClick={() => router.push('/profiles/2')}
                    className="cursor-pointer"
                  />
                </div>
                <div>
                  <p className="font-bold text-xs">Jane Doe</p>
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
