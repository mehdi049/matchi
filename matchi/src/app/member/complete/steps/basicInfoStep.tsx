'use client'

import H2 from '@/components/typography/H2'
import { zodCheck } from '@/utils/common-zod-check'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  Avatar,
  Button,
  Card,
  CardBody,
  Input,
  Radio,
  RadioGroup,
} from '@nextui-org/react'
import { Dispatch, SetStateAction } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { z } from 'zod'

export type StepProps = {
  setStep: Dispatch<SetStateAction<number>>
}

const FormInputs = z.object({
  birthday: zodCheck(['required', 'date']),
  gender: zodCheck(['gender']),
})

export default function BasicInfoStep({ setStep }: StepProps) {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(FormInputs),
  })

  const handleNextStep = handleSubmit((data) => {
    setStep(2)
  })

  return (
    <Card className="w-full">
      <CardBody className="flex gap-4 flex-col">
        <H2>Mes informations de base</H2>

        <div className="flex gap-2">
          <Avatar
            src="https://i.pravatar.cc/150?u=a04258114e29026708c"
            className="w-40 h-40"
          />
          <div className=" place-content-end">
            <Button size="sm" variant="ghost" color="primary">
              Modifier
            </Button>
          </div>
        </div>

        <form className="mb-4 flex flex-col gap-4">
          <Input
            readOnly
            size="sm"
            variant="flat"
            type="text"
            label="Nom"
            value="Marouani"
          />
          <Input
            readOnly
            size="sm"
            variant="flat"
            type="text"
            label="Prénom"
            value="Mehdi"
          />
          <Input
            readOnly
            size="sm"
            variant="flat"
            type="email"
            label="Email"
            value="mehdi.marouani@gmail.com"
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
          />
          <Controller
            control={control}
            name="gender"
            defaultValue="M"
            render={({ field: { onChange, value } }) => (
              <RadioGroup label="Sexe" onChange={onChange} value={value}>
                <Radio value="M">Homme</Radio>
                <Radio value="F">Femme</Radio>
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
          >
            Continuer
          </Button>
        </div>
      </CardBody>
    </Card>
  )
}
