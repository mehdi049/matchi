'use client'

import FontAwesome from '@/components/fontAwesome/FontAwesome'
import cities from '../../../../data/cities.json'
import H2 from '@/components/typography/H2'
import H3 from '@/components/typography/H3'
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons'
import {
  Button,
  Card,
  CardBody,
  Chip,
  Input,
  Radio,
  RadioGroup,
  Select,
  SelectItem,
  Textarea,
} from '@nextui-org/react'
import ErrorMessage from '@/components/message/ErrorMessage'
import { useContext, useMemo, useState } from 'react'
import { zodCheck } from '@/utils/common-zod-check'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Controller, useForm } from 'react-hook-form'
import { UploadProfile } from '@/components/upload/UploadProfile'
import { UserContext } from '../../context/UserContext'
import { dateConverterInput } from '@/utils/date'
import IsLoadingMessage from '@/components/message/IsLoadingMessage'
import { UserInterestResponse } from '@/types/UserInterestResponse'
import useUpdateUser from '@/hooks/user/useUpdateUser'
import SuccessMessage from '@/components/message/SuccessMessage'
import useGetInterests from '@/hooks/interest/useGetInterests'

const formInputs = z.object({
  name: zodCheck(['required']),
  birthday: zodCheck(['required', 'date']),
  bio: zodCheck(['string']),
  gender: zodCheck(['gender']),

  country: zodCheck(['string']),
  city: zodCheck(['required']),
  municipality: zodCheck(['required']),
})

export default function Page() {
  const { user, refetchUser } = useContext(UserContext)
  const [selectedCity, setSelectedCity] = useState(user.city)
  const {
    mutate,
    isPending,
    isError,
    error,
    isSuccess,
    data: dataUpdate,
  } = useUpdateUser({
    onSuccess: () => {
      refetchUser()
    },
  })
  const { data, isLoading } = useGetInterests()

  const {
    register,
    handleSubmit,
    control,
    //watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(formInputs),
  })

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

  const handleSaveProfile = handleSubmit((data) => {
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
          name: data.name,
          birthDay: new Date(data.birthday),
          bio: data.bio,
          gender: data.gender,
          city: selectedCity,
          municipality: data.municipality,
        },
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
  })

  return (
    <Card className="w-full">
      <CardBody className="flex gap-4 flex-col">
        <H2>Mon profil</H2>

        <H3>Information de base</H3>
        <UploadProfile currentImg={user.image} />

        <form className="mb-4 flex flex-col gap-4">
          <Input
            {...register('name')}
            isRequired
            size="sm"
            variant="flat"
            type="text"
            label="Nom et prénom"
            defaultValue={user.name}
            errorMessage={errors.name?.message as string}
            isInvalid={
              errors.name?.message
                ? (errors.name?.message as string).length > 0
                : false
            }
          />
          <Input
            {...register('birthday')}
            isRequired
            size="sm"
            variant="flat"
            type="date"
            label="Date de naissance"
            errorMessage={errors.birthday?.message as string}
            isInvalid={
              errors.birthday?.message
                ? (errors.birthday?.message as string).length > 0
                : false
            }
            defaultValue={user.birthDay && dateConverterInput(user.birthDay)}
          />
          <Textarea
            {...register('bio')}
            variant="flat"
            label="Bio"
            placeholder="Écrivez un peu sur vous"
            defaultValue={user.bio}
          />
          <Controller
            control={control}
            name="gender"
            defaultValue={user.gender ?? 'M'}
            render={({ field }) => (
              <RadioGroup label="Sexe" {...field} defaultValue={user.gender}>
                <Radio value="M">Homme</Radio>
                <Radio value="F">Femme</Radio>
              </RadioGroup>
            )}
          />
        </form>

        <H3>Adresse</H3>

        <form className="mb-4 flex flex-col gap-4">
          <Input
            {...register('country')}
            readOnly
            isRequired
            size="sm"
            variant="flat"
            type="text"
            label="Pays"
            value="Tunisie"
          />
          <Controller
            control={control}
            name="city"
            defaultValue={user.city}
            render={({ field }) => (
              <Select
                {...field}
                isRequired
                label="Ville"
                placeholder="Selectionnez une ville"
                size="sm"
                errorMessage={errors.city?.message as string}
                isInvalid={
                  errors.city?.message
                    ? (errors.city?.message as string).length > 0
                    : false
                }
                defaultSelectedKeys={user.city ? [user.city] : []}
                onChange={(event) => {
                  setSelectedCity(event.target.value)
                }}
              >
                {cities.map((city) => (
                  <SelectItem key={city.name} value={city.name}>
                    {city.name}
                  </SelectItem>
                ))}
              </Select>
            )}
          />
          <Controller
            control={control}
            name="municipality"
            defaultValue={user.municipality}
            render={({ field }) => (
              <Select
                {...field}
                isRequired
                label="Municipalité"
                placeholder="Selectionnez une municipalité"
                size="sm"
                errorMessage={errors.municipality?.message as string}
                isInvalid={
                  errors.municipality?.message
                    ? (errors.municipality?.message as string).length > 0
                    : false
                }
                defaultSelectedKeys={
                  user.municipality ? [user.municipality] : []
                }
              >
                {(
                  cities.find((city) => city.name === selectedCity) as any
                )?.municipalities.map((municipality: string) => (
                  <SelectItem key={municipality} value={municipality}>
                    {municipality}
                  </SelectItem>
                ))}
              </Select>
            )}
          />
        </form>

        <H3>Mes centres d&apos;intérêt</H3>

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

        <div className="flex justify-end w-full mt-8">
          <Button
            variant="solid"
            color="primary"
            className="max-w-24"
            onClick={handleSaveProfile}
            isLoading={isPending}
          >
            Valider
          </Button>
        </div>

        <ErrorMessage isVisible={isError}>{error?.message}</ErrorMessage>
        <SuccessMessage isVisible={isSuccess && !isPending} autoClose>
          {dataUpdate?.message}
        </SuccessMessage>
      </CardBody>
    </Card>
  )
}
