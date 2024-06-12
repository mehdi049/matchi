'use client'

import H2 from '@/components/typography/H2'
import H3 from '@/components/typography/H3'
import { zodCheck } from '@/utils/common-zod-check'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button, Card, CardBody, Input, Link } from '@nextui-org/react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const formInputs = z.object({
  email: zodCheck(['email', 'required']),
})

export default function Page() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(formInputs),
  })

  const handleUpdateEmail = handleSubmit((data) => {})

  return (
    <Card className="w-full">
      <CardBody className="flex gap-4 flex-col">
        <H2>Mon compte</H2>

        <form className="mb-4 flex flex-col gap-4">
          <Input
            {...register('email')}
            isRequired
            size="sm"
            variant="flat"
            type="email"
            label="Email"
            defaultValue="mehdi.marouani@gmail.com"
            errorMessage={errors.email?.message as string}
            isInvalid={
              errors.email?.message
                ? (errors.email?.message as string).length > 0
                : false
            }
          />
        </form>

        <H3>Modifier mon mot de passe</H3>

        <p className="text-sm">
          Lorsque vous modifiez votre mot de passe, vous serez automatiquement
          déconnecté de vos autres sessions
        </p>

        <Button
          href="/member/account/password"
          as={Link}
          color="secondary"
          variant="ghost"
          size="sm"
          className="max-w-min"
        >
          Modifier mon mot de passe
        </Button>

        <div className="flex justify-end w-full mt-8">
          <Button
            variant="solid"
            color="primary"
            className="max-w-24"
            onClick={handleUpdateEmail}
          >
            Valider
          </Button>
        </div>
      </CardBody>
    </Card>
  )
}
