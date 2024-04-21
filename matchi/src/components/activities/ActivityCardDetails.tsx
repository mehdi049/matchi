'use client'

import {
  Image,
  Avatar,
  Chip,
  AvatarGroup,
  Button,
  Divider,
  Link,
  User,
  CardBody,
  Card,
} from '@nextui-org/react'
import H2 from '../typography/H2'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faCalendarDay,
  faClock,
  faLocationDot,
  faMoneyCheckDollar,
} from '@fortawesome/free-solid-svg-icons'
import { useRouter } from 'next/navigation'

type ActivityProps = {
  activity?: unknown
}
export default function ActivityCardDetails({ activity }: ActivityProps) {
  const router = useRouter()
  return (
    <Card className="w-full">
      <CardBody>
        <div className="flex flex-wrap gap-4">
          <div className="grow">
            <User
              name="Jane Doe"
              description="Organizateur"
              avatarProps={{
                src: 'https://i.pravatar.cc/150?u=a04258114e29026702d',
              }}
              className="cursor-pointer"
              onClick={() => router.push('/profile/1')}
            />
            <div className="pl-12">
              <Chip color="primary" size="sm" variant="flat">
                Public
              </Chip>
            </div>
          </div>
          <div className="flex gap-1 flex-col justify-end">
            <Button size="sm" color="primary">
              Rejoindre
            </Button>
            <Button
              as={Link}
              href="/profiles"
              size="sm"
              variant="flat"
              color="primary"
            >
              Inviter des participants
            </Button>
          </div>
        </div>
        <Divider className="my-4" />

        <div className="flex items-center flex-wrap gap-4 mb-4">
          <div>
            <Image
              alt="Padel"
              className="object-cover rounded-xl w-full max-w-xs"
              src="/bg-activities/padel.jpg"
            />
          </div>

          <div>
            <H2>
              <strong>Padel</strong>
            </H2>
            <div className="flex flex-col gap-2">
              <p className="mt-4 flex gap-2 items-center">
                <FontAwesomeIcon icon={faLocationDot} /> Club Gammarth
              </p>
              <p className="flex gap-2 items-center">
                <FontAwesomeIcon icon={faCalendarDay} /> Mardi, 13 Avril 2024
              </p>
              <p className="flex gap-2 items-center">
                <FontAwesomeIcon icon={faClock} /> 19:30h - 20:30h
              </p>
              <p className="flex gap-2 items-center">
                <FontAwesomeIcon icon={faMoneyCheckDollar} /> Gratuit
              </p>
            </div>
            <Link
              href="#"
              target="_blank"
              underline="always"
              size="sm"
              className="mt-4"
            >
              Voir localisation
            </Link>
          </div>
        </div>

        <H2 className="mt-4">Plus de detail</H2>
        <p className="mt-2">
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book. It has survived not only
          five centuries, but also the leap into electronic typesetting,
          remaining essentially unchanged. It was popularised in the 1960s with
          the release of Letraset sheets containing Lorem Ipsum passages, and
          more recently with desktop publishing software like Aldus PageMaker
          including versions of Lorem Ipsum.
        </p>

        <p className="text-xs mt-4 text-gray-600">
          Publié le Mardi, 13 Avril 2024, 19:30h
        </p>

        {/* 
    <iframe
      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4223.56264409178!2d10.289723393950128!3d36.91933002635903!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12e2b5c0ffffffff%3A0x875237c923c52ac5!2sLe%20Club%20de%20Gammarth!5e0!3m2!1sen!2stn!4v1713008819192!5m2!1sen!2stn"
      className="w-full mt-4"
      height="450"
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
    ></iframe>
    */}
        <Divider className="my-4" />

        <H2>20 Participant(s)</H2>
        <AvatarGroup size="md" isBordered className="justify-start mt-4">
          <Avatar src="https://i.pravatar.cc/150?u=a042581f4e29026024d" />
          <Avatar src="https://i.pravatar.cc/150?u=a04258a2462d826712d" />
          <Avatar src="https://i.pravatar.cc/150?u=a042581f4e29026704d" />
          <Avatar src="https://i.pravatar.cc/150?u=a04258114e29026302d" />
          <Avatar src="https://i.pravatar.cc/150?u=a04258114e29026702d" />
          <Avatar src="https://i.pravatar.cc/150?u=a04258114e29026708c" />
        </AvatarGroup>
      </CardBody>
    </Card>
  )
}
