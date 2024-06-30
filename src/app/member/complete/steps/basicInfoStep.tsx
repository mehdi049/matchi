'use client'

import H2 from '@/components/typography/H2'
import { zodCheck } from '@/utils/common-zod-check'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button, CardBody, Input, Radio, RadioGroup } from '@nextui-org/react'
import { Dispatch, SetStateAction, useContext } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { z } from 'zod'
import { ProgressContext } from '../context/progressContext'
import { UserContext } from '../../context/UserContext'
import { UserResponse } from '@/types/User'
import { UploadProfile } from '@/components/upload/UploadProfile'
import useUpdateUser from '@/hooks/user/useUpdateUser'
import ErrorMessage from '@/components/message/ErrorMessage'
import { dateConverterInput } from '@/utils/date'

export type StepProps = {
  setStep: Dispatch<SetStateAction<number>>
}

const formInputs = z.object({
  birthday: zodCheck(['required', 'date']),
  gender: zodCheck(['gender']),
})

export default function BasicInfoStep({ setStep }: StepProps) {
  const { user, setUser } = useContext(UserContext)
  const { mutate, isPending, isError, error } = useUpdateUser({
    onSuccess: () => {
      setStep(2)
      context.setProgress(33)
    },
  })

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(formInputs),
  })

  const context = useContext(ProgressContext)

  const handleNextStep = handleSubmit(
    async (data: z.infer<typeof formInputs>) => {
      setUser((prevState: UserResponse) => ({
        ...prevState,
        birthDay: new Date(data.birthday),
        gender: data.gender,
      }))
      mutate({
        id: user.id,
        user: {
          ...user,
          birthDay: new Date(data.birthday),
          gender: data.gender,
        },
      })
    }
  )

  return (
    <CardBody className="flex gap-4 flex-col">
      <H2>Mes informations de base</H2>

      <UploadProfile currentImg={user.image} />

      <form className="mb-4 flex flex-col gap-4">
        <Input
          readOnly
          size="sm"
          variant="flat"
          type="text"
          label="Nom et prénom"
          value={user.name}
        />
        <Input
          readOnly
          size="sm"
          variant="flat"
          type="email"
          label="Email"
          value={user.email}
        />
        <Input
          {...register('birthday')}
          required
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
        <Controller
          control={control}
          name="gender"
          defaultValue={user.gender ?? 'Male'}
          render={({ field }) => (
            <RadioGroup label="Sexe" {...field}>
              <Radio value="Male">Homme</Radio>
              <Radio value="Female">Femme</Radio>
            </RadioGroup>
          )}
        />
      </form>

      <div className="flex justify-end w-full mt-8">
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
