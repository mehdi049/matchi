'use client'

import InputPassword from '@/components/input/InputPassword'
import H2 from '@/components/typography/H2'
import H3 from '@/components/typography/H3'
import { zodCheck } from '@/utils/common-zod-check'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button, Card, CardBody, Input, Link } from '@nextui-org/react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const formInputs = z
  .object({
    old_password: zodCheck(['required']),
    new_password: zodCheck(['required']),
    confirm_new_password: zodCheck(['required']),
  })
  .refine((data) => data.new_password === data.confirm_new_password, {
    message: 'Mot de passe non identique.',
    path: ['confirm'], // path of error
  })

export default function Page() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(formInputs),
  })

  const handleUpdatePassword = handleSubmit((data) => {})

  return (
    <Card className="w-full">
      <CardBody className="flex gap-4 flex-col">
        <H2>Modifier mon mot de passe</H2>

        <form className="mb-4 flex flex-col gap-4">
          <InputPassword
            register={register('old_password')}
            errorMessage={errors.old_password?.message as string}
            isRequired
            size="sm"
            variant="flat"
            label="Mot de passe actuel"
          />
          <InputPassword
            register={register('new_password')}
            errorMessage={errors.new_password?.message as string}
            isRequired
            size="sm"
            variant="flat"
            label="Nouveau mot de passe"
          />
          <InputPassword
            register={register('confirm_new_password')}
            errorMessage={errors.confirm?.message as string}
            isRequired
            size="sm"
            variant="flat"
            label="Confirmer mon nouveau mot de passe"
          />
        </form>

        <div className="flex justify-end w-full mt-8">
          <Button
            variant="solid"
            color="primary"
            className="max-w-24"
            onClick={handleUpdatePassword}
          >
            Valider
          </Button>
        </div>
      </CardBody>
    </Card>
  )
}
