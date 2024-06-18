'use client'

import FontAwesome from '@/components/fontAwesome/FontAwesome'
import H2 from '@/components/typography/H2'
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons'
import { Button, CardBody, Chip } from '@nextui-org/react'
import { StepProps } from './basicInfoStep'
import { useRouter } from 'next/navigation'
import { useContext, useMemo, useState } from 'react'

import ErrorMessage from '@/components/message/ErrorMessage'
import { ProgressContext } from '../context/progressContext'
import { UserContext } from '../../context/UserContext'
import useUpdateUser from '@/hooks/user/useUpdateUser'
import IsLoadingMessage from '@/components/message/IsLoadingMessage'
import { ROUTES } from '@/routes'
import useGetInterests from '@/hooks/interest/useGetInterests'
import { UserInterestResponse } from '@/types/UserInterestResponse'
import { UserResponse } from '@/types/User'

export default function InterestStep({ setStep }: StepProps) {
  const { user, setUser } = useContext(UserContext)

  const { data, isLoading } = useGetInterests()

  const { mutate, isPending, isError, error } = useUpdateUser({
    onSuccess: () => {
      context.setProgress(100)

      let userInterests: UserInterestResponse[] = []
      selectedActivities.map((activity) => {
        userInterests.push({
          activityId: activity,
        })
      })

      setTimeout(() => {
        setUser((prevState: UserResponse) => ({
          ...prevState,
          interests: userInterests,
        }))
        router.push(ROUTES.MEMBER.PROFILE)
      }, 1000)
    },
  })

  const router = useRouter()
  const context = useContext(ProgressContext)

  const [selectedActivities, setSelectedActivities] = useState<number[]>([])
  const [isErrorVisible, setIsErrorVisible] = useState<boolean>(false)

  useMemo(() => {
    let _selectedActivities: number[] = []
    user.interests?.map((interest) => {
      _selectedActivities.push((interest as UserInterestResponse).activityId)
    })
    setSelectedActivities(_selectedActivities)
  }, [])

  const handleAddRemoveActivity = (activityId: number) => {
    setIsErrorVisible(false)

    if (activityId) {
      let _selectedActivities = [...selectedActivities]

      //if selected
      if (_selectedActivities.includes(activityId))
        _selectedActivities = _selectedActivities.filter(
          (x) => x !== activityId
        )
      //if not selected
      else _selectedActivities.push(activityId)

      setSelectedActivities(_selectedActivities)
    }
  }

  const handleNextStep = () => {
    setIsErrorVisible(false)

    if (selectedActivities.length > 0) {
      let userInterests: UserInterestResponse[] = []
      selectedActivities.map((activity) => {
        userInterests.push({
          activityId: activity,
        })
      })

      mutate({
        id: user.id,
        user: {
          ...user,
          interests: userInterests,
        },
        updateInterests: true,
      })
    } else setIsErrorVisible(true)
  }

  return (
    <CardBody className="flex gap-4 flex-col">
      <H2>Mes centres d&apos;intérét</H2>
      <p className="text-sm">
        Sélectionnez <span className="underline">au moin une activité.</span>
      </p>
      <div className="flex gap-2 flex-wrap mt-4">
        {isLoading && <IsLoadingMessage type="flat" />}
        {data?.body?.map((activity, key) => {
          return (
            <div
              className="inline-block cursor-pointer"
              key={key}
              onClick={() => handleAddRemoveActivity(activity.id)}
            >
              {selectedActivities.includes(activity.id) ? (
                <Chip
                  startContent={<FontAwesome icon={faCircleCheck} />}
                  color="primary"
                  size="lg"
                >
                  {activity.name}
                </Chip>
              ) : (
                <Chip size="lg" variant="flat">
                  {activity.name}
                </Chip>
              )}
            </div>
          )
        })}
      </div>
      <ErrorMessage isVisible={isErrorVisible}>
        Sélectionnez au moin une activité.
      </ErrorMessage>
      <div className="flex gap-2 justify-end w-full mt-8">
        <Button variant="light" className="max-w-24" onClick={() => setStep(2)}>
          Retour
        </Button>
        <Button
          variant="solid"
          color="primary"
          className="max-w-24"
          onClick={() => handleNextStep()}
          isLoading={isPending}
        >
          Continuer
        </Button>
      </div>

      <ErrorMessage isVisible={isError}>{error?.message}</ErrorMessage>
    </CardBody>
  )
}
