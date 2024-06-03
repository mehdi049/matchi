'use client'

import FontAwesome from '@/components/fontAwesome/FontAwesome'
import H2 from '@/components/typography/H2'
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons'
import { Button, CardBody, Chip } from '@nextui-org/react'
import { StepProps } from './basicInfoStep'
import { useRouter } from 'next/navigation'
import { useContext, useState } from 'react'

import activities from '../../../../data/activities.json'
import ErrorMessage from '@/components/message/ErrorMessage'
import { ProgressContext } from '../context/progressContext'
import { UserContext } from '../../context/UserContext'
import { UserResponse } from '@/types/User'

export default function InterestStep({ setStep }: StepProps) {
  const { user, setUser } = useContext(UserContext)
  const router = useRouter()
  const context = useContext(ProgressContext)

  const [selectedActivities, setSelectedActivities] = useState<string[]>([])
  const [isErrorVisible, setIsErrorVisible] = useState<boolean>(false)

  const handleAddRemoveActivity = (activity: string) => {
    setIsErrorVisible(false)

    if (activity) {
      let _selectedActivities = [...selectedActivities]

      //if selected
      if (_selectedActivities.includes(activity))
        _selectedActivities = _selectedActivities.filter((x) => x !== activity)
      //if not selected
      else _selectedActivities.push(activity)

      setSelectedActivities(_selectedActivities)
    }
  }

  const handleNextStep = () => {
    setIsErrorVisible(false)

    if (selectedActivities.length > 0) {
      context.setProgress(100)

      setTimeout(() => {
        setUser((prevState: UserResponse) => ({
          ...prevState,
          activities: selectedActivities,
        }))
        //router.push('/member/profile')
      }, 1000)
    } else setIsErrorVisible(true)
  }

  return (
    <CardBody className="flex gap-4 flex-col">
      <H2>Mes centres d&apos;intérét</H2>
      <p className="text-sm">
        Sélectionnez <span className="underline">au moin une activité.</span>
      </p>
      <div className="flex gap-2 flex-wrap mt-4">
        {activities.map((activity, key) => {
          return (
            <div
              className="inline-block cursor-pointer"
              key={key}
              onClick={() => handleAddRemoveActivity(activity.value as string)}
            >
              {selectedActivities.includes(activity.value as string) ? (
                <Chip
                  startContent={<FontAwesome icon={faCircleCheck} />}
                  color="primary"
                  size="lg"
                >
                  {activity.label}
                </Chip>
              ) : (
                <Chip size="lg" variant="flat">
                  {activity.label}
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
        >
          Continuer
        </Button>
      </div>
    </CardBody>
  )
}
