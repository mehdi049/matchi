'use client'

import { User, CardBody, Card, Chip, Button } from '@nextui-org/react'
import { useRouter } from 'next/navigation'
import ProfileRating from '../rating/Rating'
import { UserResponse } from '@/types/User'
import useGetInterests from '@/hooks/interest/useGetInterests'
import IsLoadingMessage from '../message/IsLoadingMessage'

type ProfileProps = {
  profile?: UserResponse
}
export default function ProfileCard({ profile }: ProfileProps) {
  const router = useRouter()
  const { data, isLoading } = useGetInterests()

  return (
    <div onClick={() => router.push('/profiles/1')}>
      <Card className="w-full cursor-pointer">
        <CardBody className="flex gap-2 flex-col">
          <div className="flex gap-2 flex-wrap">
            <User
              name="Mehdi Marouani, 33 ans"
              description="Tunis, Tunisie"
              avatarProps={{
                src: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
              }}
              className="justify-start grow"
            />
            <div className="pt-1">
              <ProfileRating size="sm" />
            </div>
          </div>

          {isLoading && <IsLoadingMessage type="flat" />}
          {data && (
            <div className="flex gap-1 flex-wrap">
              <Chip color="primary" size="sm" variant="solid">
                Basket
              </Chip>
              <Chip color="primary" size="sm" variant="solid">
                Football
              </Chip>
              <Chip color="primary" size="sm" variant="solid">
                Sortie en Moto
              </Chip>
            </div>
          )}
          <div className="text-right">
            <Button
              color="danger"
              variant="ghost"
              size="sm"
              className=" max-w-min"
            >
              Inviter
            </Button>
          </div>
        </CardBody>
      </Card>
    </div>
  )
}
