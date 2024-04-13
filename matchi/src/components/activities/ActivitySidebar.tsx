'use client'

import { Card, CardBody, User } from '@nextui-org/react'
import H2 from '../typography/H2'
import { useRouter } from 'next/navigation'

export default function ActivitySidebar() {
  const router = useRouter()
  const getRandomInt = (max: number) => {
    return Math.floor(Math.random() * max)
  }
  const randomNumber = getRandomInt(8)
  return (
    <Card className="w-full max-w-sm">
      <CardBody>
        <H2>Activités similaires</H2>
        <div className="mt-4 divide-y">
          {[...Array(randomNumber).keys()].map((x, key) => {
            return (
              <div
                key={key}
                className="flex gap-2 py-2 justify-between hover:bg-gray-100 duration-100 cursor-pointer px-1.5"
                onClick={() => {
                  router.push('/activity/1')
                }}
              >
                <User
                  name="Jane Doe"
                  description="6/10 participant(s)"
                  avatarProps={{
                    src: 'https://i.pravatar.cc/150?u=a04258114e29026702d',
                  }}
                />
                <div>
                  <p>
                    <strong>Padel</strong>
                    <span className="text-xs"> / Club Gammarth</span>
                  </p>
                  <p className="text-xs">Jeudi, 17 Avril 2024, 19h-20h</p>
                </div>
              </div>
            )
          })}
        </div>

        <H2 className="mt-8">Autre activités sur grand Tunis</H2>
        <div className="mt-4 divide-y">
          {[...Array(randomNumber).keys()].map((x, key) => {
            return (
              <div
                key={key}
                className="flex gap-2 py-2 justify-between hover:bg-gray-100 duration-100 cursor-pointer px-1.5"
                onClick={() => {
                  router.push('/activity/1')
                }}
              >
                <User
                  name="Jane Doe"
                  description="6/10 participant(s)"
                  avatarProps={{
                    src: 'https://i.pravatar.cc/150?u=a04258114e29026702d',
                  }}
                />
                <div>
                  <p>
                    <strong>Padel</strong>
                    <span className="text-xs"> / Club Gammarth</span>
                  </p>
                  <p className="text-xs">Jeudi, 17 Avril 2024, 19h-20h</p>
                </div>
              </div>
            )
          })}
        </div>
      </CardBody>
    </Card>
  )
}
