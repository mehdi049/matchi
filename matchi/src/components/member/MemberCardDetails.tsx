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
import MemberFeedback from './MemberFeedback'

type MemberProps = {
  member?: unknown
}
export default function MemberCardDetails({ member }: MemberProps) {
  const router = useRouter()
  return (
    <div className="flex gap-4">
      <Card className="w-full max-w-xs">
        <CardBody className="flex gap-4 flex-col">
          <Image
            src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt=""
            className="w-full"
          />
          <H1>Mehdi Marouani</H1>
          <p>mehdi.marouani@gmail.com</p>
          <p>33 ans</p>
          <p>Tunis, Tunisie</p>
          <MemberRating />
          <Divider />
          <p className="text-xs">Participé à 30 évenement(s)</p>
          <p className="text-xs">A rejoint Matchi en Avril 2024</p>
        </CardBody>
      </Card>

      <div>
        <Card className="w-full">
          <CardBody>
            <H2>Centre d&apos;intérét</H2>
            <div className="flex gap-1 flex-wrap mt-4">
              <Chip color="primary" variant="solid">
                Basket
              </Chip>
              <Chip color="primary" variant="solid">
                Football
              </Chip>
              <Chip color="primary" variant="solid">
                Sortie en Moto
              </Chip>
            </div>
          </CardBody>
        </Card>
        <MemberFeedback />
      </div>

      <Card className="w-full">
        <CardBody>
          <H2>Evenements organisés</H2>
          <div className="mt-4 divide-y max-w-sm">
            {[...Array(4).keys()].map((x, key) => {
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
    </div>
  )
}
