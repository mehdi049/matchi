'use client'

import { Button, Divider, Input, Link } from '@nextui-org/react'
import FontAwesome from '../fontAwesome/FontAwesome'
import { faFacebook, faGoogle } from '@fortawesome/free-brands-svg-icons'
import InputPassword from '../input/InputPassword'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { ROUTES } from '@/routes'
import { zodCheck } from '@/utils/common-zod-check'
import { signIn } from 'next-auth/react'

const FormInputs = z.object({
  email: zodCheck(['required', 'email']),
  password: zodCheck(['required']),
})

export default function LoginForm() {
  const router = useRouter()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(FormInputs),
  })

  const handleLogin = handleSubmit((data) => {
    router.push(ROUTES.MEMBER.PROFILE)
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
        <Button color="primary" size="md" onClick={handleLogin}>
          Confirmer
        </Button>
      </form>
      <Divider orientation="horizontal" />
      <div className="mt-4 flex flex-col gap-2">
        <Button
          variant="ghost"
          color="primary"
          size="md"
          startContent={<FontAwesome icon={faFacebook} />}
          onClick={() => signIn('facebook')}
        >
          Me connecter avec Facebook
        </Button>
        <Button
          variant="ghost"
          color="primary"
          size="md"
          startContent={<FontAwesome icon={faGoogle} />}
          onClick={() =>
            signIn('google', {
              callbackUrl: 'http://localhost:3000/member/complete',
            })
          }
        >
          Me connecter avec Google
        </Button>
      </div>
    </>
  )
}
