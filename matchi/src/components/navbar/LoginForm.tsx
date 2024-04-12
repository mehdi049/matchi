'use client'

import { Button, Divider, Input, Link } from '@nextui-org/react'
import FontAwesome from '../fontAwesome/FontAwesome'
import { faFacebook, faGoogle } from '@fortawesome/free-brands-svg-icons'
import { faEnvelope } from '@fortawesome/free-solid-svg-icons'
import InputPassword from '../input/InputPassword'

export default function LoginForm() {
  return (
    <>
      <form className="mb-4 flex flex-col gap-4">
        <Input isRequired size="sm" variant="flat" type="email" label="Email" />
        <InputPassword
          isRequired
          size="sm"
          variant="flat"
          label="Mot de passe"
        />
        <Link href="#" size="sm" color="danger">
          Mot de passe oublié ?
        </Link>
        <Button color="primary" size="md">
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
          Me connecter avec Facebook
        </Button>
        <Button
          variant="ghost"
          color="primary"
          size="md"
          startContent={<FontAwesome icon={faGoogle} />}
        >
          Me connecter avec Google
        </Button>
        <Button
          variant="ghost"
          color="primary"
          size="md"
          startContent={<FontAwesome icon={faEnvelope} />}
        >
          Me connecter avec Email
        </Button>
      </div>
    </>
  )
}
