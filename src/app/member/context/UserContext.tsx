'use client'
import ErrorMessage from '@/components/message/ErrorMessage'
import IsLoadingMessage from '@/components/message/IsLoadingMessage'
import { MESSAGES } from '@/const/message'
import useGetUserByEmail from '@/hooks/user/useGetUserByEmail'
import { ROUTES } from '@/routes'
import { UserResponse } from '@/types/User'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { createContext, useMemo, useState } from 'react'

const initUser: UserResponse = {
  id: '',
  name: '',
  email: '',
  image: '',
  birthDay: new Date(),
  bio: '',
  gender: '',
  country: '',
  city: '',
  municipality: '',
  createdAt: new Date(),
  updatedAt: new Date(),
  addedActivities: [],
  interests: [],
  userAttendance: [],
}
export const UserContext = createContext({
  isLoggedIn: false,
  user: initUser,
  setUser: (payload: any) => {},
  refetchUser: () => {},
})

type UserContextProviderProps = {
  children: React.ReactNode
  isPrivate?: boolean
}
export const UserContextProvider = ({
  children,
  isPrivate,
}: UserContextProviderProps) => {
  const router = useRouter()

  const { data: session } = useSession()

  const { data, isError, isLoading, refetch } = useGetUserByEmail(
    session?.user?.email as string
  )
  const [user, setUser] = useState<UserResponse>(initUser)

  const { status } = useSession()

  const refetchUser = () => refetch()

  useMemo(() => {
    if (data) setUser(data?.body as UserResponse)
  }, [data])

  useMemo(() => {
    if (data) {
      // check if basic profil info are set
      if (
        !data.body?.birthDay ||
        !data.body?.city ||
        !data.body?.municipality ||
        data.body?.interests?.length === 0
      )
        router.push(ROUTES.MEMBER.COMPLETE_PROFILE)
    }
  }, [])

  if (isPrivate) {
    // unauthenticated
    if (status === 'loading') return <IsLoadingMessage type="flat" />
    if (status === 'unauthenticated') router.push(ROUTES.HOME)

    // user not found
    if (isLoading) return <IsLoadingMessage type="flat" />
    if (isError)
      return <ErrorMessage isVisible>{MESSAGES.ERROR.GENERAL}</ErrorMessage>
  }

  return (
    <UserContext.Provider
      value={{
        isLoggedIn: session?.user !== undefined,
        user,
        setUser,
        refetchUser,
      }}
    >
      {children}
    </UserContext.Provider>
  )
}
