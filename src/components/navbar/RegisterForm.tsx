'use client'

import { registerUser, RegisterUserProps } from '@/services/public'
import { zodCheck } from '@/utils/common-zod-check'
import { faFacebook, faGoogle } from '@fortawesome/free-brands-svg-icons'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button, Divider, Input, Link, useDisclosure } from '@nextui-org/react'
import { useMutation } from '@tanstack/react-query'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import FontAwesome from '../fontAwesome/FontAwesome'
import InputPassword from '../input/InputPassword'
import ErrorMessage from '../message/ErrorMessage'
import SuccessMessage from '../message/SuccessMessage'
import { signIn } from 'next-auth/react'
import { ROUTES } from '@/routes'
import { ModalLoginForm } from './ModalLoginForm'

const formInputs = z
  .object({
    fName: zodCheck(['required']),
    lName: zodCheck(['required']),
    email: zodCheck(['required', 'email']),
    password: zodCheck(['required']),
    confirm_password: zodCheck(['required']),
  })
  .refine((data) => data.password === data.confirm_password, {
    message: 'Mot de passe non identique.',
    path: ['confirm'],
  })

export default function RegisterForm() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure()

  const [error, setError] = useState<string>('')

  const { mutate, isPending, isError, isSuccess } = useMutation({
    mutationFn: (data: RegisterUserProps) => {
      return registerUser({
        name: data.name,
        email: data.email,
        password: data.password,
      })
    },
    onError: (error) => {
      setError(error.message)
    },
  })

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(formInputs),
  })

  const handleRegister = handleSubmit(
    async (data: z.infer<typeof formInputs>) => {
      setError('')
      mutate({
        name: `${data.fName} ${data.lName}`,
        email: data.email,
        password: data.password,
      })
    }
  )

  return (
    <>
      <form className="mb-4 flex flex-col gap-4">
        <Input
          {...register('lName')}
          isRequired
          size="sm"
          variant="flat"
          type="text"
          label="Nom"
          errorMessage={errors.lName?.message as string}
          isInvalid={
            errors.lName?.message
              ? (errors.lName?.message as string).length > 0
              : false
          }
        />
        <Input
          {...register('fName')}
          isRequired
          size="sm"
          variant="flat"
          type="text"
          label="Prénom"
          errorMessage={errors.fName?.message as string}
          isInvalid={
            errors.fName?.message
              ? (errors.fName?.message as string).length > 0
              : false
          }
        />
        <Input
          {...register('email')}
          isRequired
          size="sm"
          variant="flat"
          type="email"
          label="Email"
          errorMessage={errors.email?.message as string}
          isInvalid={
            errors.email?.message
              ? (errors.email?.message as string).length > 0
              : false
          }
        />
        <InputPassword
          register={register('password')}
          isRequired
          size="sm"
          variant="flat"
          label="Mot de passe"
          errorMessage={errors.password?.message as string}
        />
        <InputPassword
          register={register('confirm_password')}
          isRequired
          size="sm"
          variant="flat"
          label="Confirmer mon mot de passe"
          errorMessage={errors.confirm?.message as string}
        />

        <Button
          color="primary"
          size="md"
          isLoading={isPending}
          onClick={handleRegister}
        >
          Confirmer
        </Button>
      </form>

      <ErrorMessage isVisible={isError}>{error}</ErrorMessage>
      <SuccessMessage isVisible={isSuccess}>
        <p>Votre compte est créé avec succés.</p>{' '}
        <Link
          onPress={onOpen}
          className="text-white cursor-pointer"
          underline="always"
          size="sm"
        >
          Me connecter?
        </Link>
      </SuccessMessage>
      <Divider orientation="horizontal" />
      <div className="mt-4 flex flex-col gap-2">
        <Button
          variant="ghost"
          color="primary"
          size="md"
          startContent={<FontAwesome icon={faFacebook} />}
          onClick={() =>
            signIn('facebook', {
              callbackUrl: ROUTES.MEMBER.PROFILE,
            })
          }
        >
          Continuer avec Facebook
        </Button>
        <Button
          variant="ghost"
          color="primary"
          size="md"
          startContent={<FontAwesome icon={faGoogle} />}
          onClick={() =>
            signIn('google', {
              callbackUrl: ROUTES.MEMBER.PROFILE,
            })
          }
        >
          Continuer avec Google
        </Button>
      </div>

      <ModalLoginForm isOpen={isOpen} onOpenChange={onOpenChange} />
    </>
  )
}
