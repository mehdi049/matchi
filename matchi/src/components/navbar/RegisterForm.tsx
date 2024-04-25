'use client'

import { Button, Divider, Input } from '@nextui-org/react'
import FontAwesome from '../fontAwesome/FontAwesome'
import { faFacebook, faGoogle } from '@fortawesome/free-brands-svg-icons'
import { faEnvelope } from '@fortawesome/free-solid-svg-icons'
import InputPassword from '../input/InputPassword'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { ROUTES } from '@/routes'

const FormInputs = z
  .object({
    fName: z.string().min(1, { message: 'Champ obligatoir.' }),
    lName: z.string().min(1, { message: 'Champ obligatoir.' }),
    email: z
      .string()
      .min(1, { message: 'Champ obligatoir.' })
      .email({ message: 'Email invalid.' }),
    password: z
      .string({ required_error: 'Champ obligatoir.' })
      .min(1, { message: 'Champ obligatoir.' }),
    confirm_password: z
      .string({ required_error: 'Champ obligatoir.' })
      .min(1, { message: 'Champ obligatoir.' }),
  })
  .refine((data) => data.password === data.confirm_password, {
    message: 'Mot de passe non identique.',
    path: ['confirm'], // path of error
  })

export default function RegisterForm() {
  const router = useRouter()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(FormInputs),
  })

  const handleRegister = handleSubmit((data) => {
    router.push(ROUTES.MEMBER.COMPLETE_PROFILE)
  })

  return (
    <>
      <form className="mb-4 flex flex-col gap-4">
        <Input
          isRequired
          size="sm"
          variant="flat"
          type="text"
          label="Nom"
          {...register('lName')}
          errorMessage={errors.lName?.message as string}
          isInvalid={
            errors.lName?.message
              ? (errors.lName?.message as string).length > 0
              : false
          }
        />
        <Input
          isRequired
          size="sm"
          variant="flat"
          type="text"
          label="Prénom"
          {...register('fName')}
          errorMessage={errors.fName?.message as string}
          isInvalid={
            errors.fName?.message
              ? (errors.fName?.message as string).length > 0
              : false
          }
        />
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
          size="sm"
          variant="flat"
          label="Mot de passe"
          register={register('password')}
          errorMessage={errors.password?.message as string}
        />
        <InputPassword
          size="sm"
          variant="flat"
          label="Confirmer mon mot de passe"
          register={register('confirm_password')}
          errorMessage={errors.confirm?.message as string}
        />

        <Button color="primary" size="md" onClick={handleRegister}>
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
        >
          Continuer avec Facebook
        </Button>
        <Button
          variant="ghost"
          color="primary"
          size="md"
          startContent={<FontAwesome icon={faGoogle} />}
        >
          Continuer avec Google
        </Button>
        <Button
          variant="ghost"
          color="primary"
          size="md"
          startContent={<FontAwesome icon={faEnvelope} />}
        >
          Continuer avec Email
        </Button>
      </div>
    </>
  )
}
