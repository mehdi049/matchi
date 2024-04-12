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
import { faCalendar, faLocationDot } from '@fortawesome/free-solid-svg-icons'

type ActivityProps = {
  activity?: unknown
}
export default function Activity({ activity }: ActivityProps) {
  return (
    <Card className="py-4 w-full md:w-[300px] cursor-pointer">
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
          <Chip color="primary" size="sm" variant="flat">
            Padel
          </Chip>
        </div>
        <h4 className="font-bold text-large mt-4">Frontend Radio</h4>
      </CardHeader>
      <CardBody className="overflow-visible py-2">
        <Image
          alt="Card background"
          className="object-cover rounded-xl"
          src="https://nextui.org/images/hero-card.jpeg"
          width={270}
        />
      </CardBody>
      <CardFooter className="gap-3 flex justify-between gap-2">
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
    </Card>
  )
}
