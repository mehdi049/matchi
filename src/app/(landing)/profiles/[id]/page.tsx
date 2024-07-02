'use client'

import ErrorMessage from '@/components/message/ErrorMessage'
import MemberCardDetails from '@/components/profile/ProfileCardDetails'
import IsLoadingSkeleton from '@/components/skeleton/IsLoadingSkeleton'
import { MESSAGES } from '@/const/message'
import useGetUserById from '@/hooks/user/useGetUserById'
import { UserResponse } from '@/types/User'

export default function Page({ params }: { params: { id: string } }) {
  const { data, isPending, isError } = useGetUserById(params.id)
  if (isPending) return <IsLoadingSkeleton type="activity-details-card" />
  if (isError)
    return <ErrorMessage isVisible>{MESSAGES.ERROR.GENERAL}</ErrorMessage>

  return <MemberCardDetails profile={data.body as UserResponse} />
}
