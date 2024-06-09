'use client'

import H2 from '@/components/typography/H2'
import {
  //Autocomplete,
  //AutocompleteItem,
  Select,
  SelectItem,
  Button,
  CardBody,
  Input,
} from '@nextui-org/react'
import cities from '../../../../data/cities.json'
import { StepProps } from './basicInfoStep'
import { zodCheck } from '@/utils/common-zod-check'
import { z } from 'zod'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useContext } from 'react'
import { ProgressContext } from '../context/progressContext'
import { UserContext } from '../../context/UserContext'
import { UserResponse } from '@/types/User'
import useUpdateUser from '@/hooks/user/useUpdateUser'
import ErrorMessage from '@/components/message/ErrorMessage'

const FormInputs = z.object({
  country: zodCheck(['string']),
  city: zodCheck(['required']),
  municipality: zodCheck(['required']),
})

export default function MyAddressStep({ setStep }: StepProps) {
  const { user, setUser } = useContext(UserContext)
  const { mutate, isPending, isError, error } = useUpdateUser({
    onSuccess: () => {
      setStep(3)
      context.setProgress(66)
    },
  })

  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(FormInputs),
  })
  const context = useContext(ProgressContext)

  const handleNextStep = handleSubmit((data) => {
    setUser((prevState: UserResponse) => ({
      ...prevState,
      country: 'Tunisia',
      city: data.city,
      municipality: data.municipality,
    }))
    mutate({
      id: user.id,
      user: {
        ...user,
        country: 'Tunisia',
        city: data.city,
        municipality: data.municipality,
      },
    })
  })

  return (
    <CardBody className="flex gap-4 flex-col">
      <H2>Mon adresse</H2>

      <form className="mb-4 flex flex-col gap-4">
        {user.city}
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
              defaultSelectedKeys={user.municipality ? [user.municipality] : []}
            >
              {(
                cities.find((city) =>
                  city.name === user.city ? user.city : watch('city')
                ) as any
              )?.municipalities.map((municipality: string) => (
                <SelectItem key={municipality} value={municipality}>
                  {municipality}
                </SelectItem>
              ))}
            </Select>
          )}
        />
      </form>

      <div className="flex gap-2 justify-end w-full mt-8">
        <Button variant="light" className="max-w-24" onClick={() => setStep(1)}>
          Retour
        </Button>
        <Button
          variant="solid"
          color="primary"
          className="max-w-24"
          onClick={handleNextStep}
          isLoading={isPending}
        >
          Continuer
        </Button>
      </div>

      <ErrorMessage isVisible={isError}>{error?.message}</ErrorMessage>
    </CardBody>
  )
}
