'use client'

import {
  Card,
  CardHeader,
  CardBody,
  Image,
  Avatar,
  CardFooter,
  Chip,
  AvatarGroup,
} from '@nextui-org/react'
import FontAwesome from '../fontAwesome/FontAwesome'
import { faLocationDot } from '@fortawesome/free-solid-svg-icons'
import { useRouter } from 'next/navigation'
import ActivitiyCardFooterAttending from './ActivitiyCardFooterAttending'
import ActivitiyCardFooterHosting from './ActivitiyCardFooterHosting'

type ActivityProps = {
  activity?: unknown
  hosting?: boolean
  attending?: boolean
  status?: 'pending' | 'accepted' | 'rejected'
}
export default function ActivityCard({
  activity,
  hosting,
  attending,
  status,
}: ActivityProps) {
  const router = useRouter()

  const getRandomInt = (max: number) => {
    return Math.floor(Math.random() * max)
  }
  const randomNumber = getRandomInt(4)

  const imageOptions = [
    'basketball.jpg',
    'bicycle.jpg',
    'bTennis.jpg',
    'football.jpg',
    'handball.jpg',
    'moto.jpg',
    'padel.jpg',
    'tennis.jpg',
    'volleyball.jpg',
  ]
  return (
    <div
      onClick={() => {
        router.push('/activity/1')
      }}
    >
      <Card className="py-4 cursor-pointer grow">
        <CardHeader className="flex-col items-start">
          <div className="flex w-full justify-between gap-2">
            <div className="flex gap-5">
              <Avatar
                isBordered
                radius="full"
                size="md"
                src="https://nextui.org/avatars/avatar-1.png"
              />
              <div className="flex flex-col gap-1 items-start justify-center">
                <h4 className="text-small font-semibold leading-none text-default-600">
                  Zoey Lang
                </h4>
                <h5 className="text-small tracking-tight text-default-400">
                  Mardi, 15 Avril 2024
                </h5>
                <h5 className="text-small tracking-tight text-default-400">
                  <FontAwesome icon={faLocationDot} /> Terrain Club Gammarth
                </h5>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <Chip color="primary" size="sm" variant="flat">
                Padel
              </Chip>
              {status && (
                <>
                  {status === 'accepted' && (
                    <Chip color="success" size="sm" variant="flat">
                      Accepté
                    </Chip>
                  )}
                  {status === 'rejected' && (
                    <Chip color="danger" size="sm">
                      Rejeté
                    </Chip>
                  )}
                  {status === 'pending' && <Chip size="sm">En attente</Chip>}
                </>
              )}
            </div>
          </div>
          <h4 className="font-bold text-large mt-4">Frontend Radio</h4>
        </CardHeader>
        <CardBody className="overflow-visible py-2">
          <Image
            alt="Card background"
            className="object-cover rounded-xl w-full sm:max-w-sm"
            src={'/bg-activities/' + imageOptions[randomNumber]}
          />
        </CardBody>
        <CardFooter className="flex justify-between gap-2">
          <div className="flex gap-1">
            <p className="font-semibold text-default-400 text-small">4/12</p>
            <p className=" text-default-400 text-small">Participant(s)</p>
          </div>

          <AvatarGroup size="sm" isBordered max={3}>
            <Avatar src="https://i.pravatar.cc/150?u=a042581f4e29026024d" />
            <Avatar src="https://i.pravatar.cc/150?u=a04258a2462d826712d" />
            <Avatar src="https://i.pravatar.cc/150?u=a042581f4e29026704d" />
            <Avatar src="https://i.pravatar.cc/150?u=a04258114e29026302d" />
            <Avatar src="https://i.pravatar.cc/150?u=a04258114e29026702d" />
            <Avatar src="https://i.pravatar.cc/150?u=a04258114e29026708c" />
          </AvatarGroup>
        </CardFooter>
        {hosting && <ActivitiyCardFooterHosting />}

        {attending && <ActivitiyCardFooterAttending />}
      </Card>
    </div>
  )
}
