'use client'

import { ROUTES } from '@/routes'
import { zodCheck } from '@/utils/common-zod-check'
import { faFacebook, faGoogle } from '@fortawesome/free-brands-svg-icons'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button, Divider, Input, Link } from '@nextui-org/react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import FontAwesome from '../fontAwesome/FontAwesome'
import InputPassword from '../input/InputPassword'
import ErrorMessage from '../message/ErrorMessage'
import { useState } from 'react'

const formInputs = z.object({
  email: zodCheck(['required', 'email']),
  password: zodCheck(['required']),
})

export default function LoginForm() {
  const router = useRouter()
  const [error, setError] = useState<string>('')
  const [isLoadingFb, setIsLoadingFb] = useState<boolean>(false)
  const [isLoadingGoogle, setIsLoadingGoogle] = useState<boolean>(false)

  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm({
    resolver: zodResolver(formInputs),
  })

  const handleLogin = handleSubmit(async (data: z.infer<typeof formInputs>) => {
    setError('')
    let result = await signIn('credentials', {
      username: data.email,
      password: data.password,
      redirect: false,
    })
    if (result?.error) setError('Email ou mot de passe incorrect.')
    else router.push(ROUTES.MEMBER.PROFILE)
  })

  return (
    <>
      <form className="mb-4 flex flex-col gap-4">
        <Input
          isRequired
          size="sm"
          variant="flat"
          type="email"
          label="Email"
          {...register('email')}
          errorMessage={errors.email?.message as string}
          isInvalid={
            errors.email?.message
              ? (errors.email?.message as string).length > 0
              : false
          }
        />
        <InputPassword
          isRequired
          size="sm"
          variant="flat"
          label="Mot de passe"
          register={register('password')}
          errorMessage={errors.password?.message as string}
        />
        <Link href="#" size="sm" color="danger">
          Mot de passe oublié ?
        </Link>
        <Button
          color="primary"
          isLoading={isSubmitting}
          size="md"
          onClick={handleLogin}
        >
          Confirmer
        </Button>

        <ErrorMessage isVisible={error.length > 0}>{error}</ErrorMessage>
      </form>
      <Divider orientation="horizontal" />
      <div className="mt-4 flex flex-col gap-2">
        <Button
          variant="ghost"
          color="primary"
          size="md"
          startContent={<FontAwesome icon={faFacebook} />}
          onClick={() => {
            setIsLoadingFb(true)
            signIn('facebook', {
              callbackUrl: ROUTES.MEMBER.PROFILE,
            })
          }}
          isLoading={isLoadingFb}
        >
          Me connecter avec Facebook
        </Button>
        <Button
          variant="ghost"
          color="primary"
          size="md"
          startContent={<FontAwesome icon={faGoogle} />}
          onClick={() => {
            setIsLoadingGoogle(true)
            signIn('google', {
              callbackUrl: ROUTES.MEMBER.PROFILE,
            })
          }}
          isLoading={isLoadingGoogle}
        >
          Me connecter avec Google
        </Button>
      </div>
    </>
  )
}
