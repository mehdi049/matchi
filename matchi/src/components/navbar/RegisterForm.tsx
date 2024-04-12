'use client'

import { Button, Divider, Input } from '@nextui-org/react'
import FontAwesome from '../fontAwesome/FontAwesome'
import { faFacebook, faGoogle } from '@fortawesome/free-brands-svg-icons'
import { faEnvelope } from '@fortawesome/free-solid-svg-icons'
import InputPassword from '../input/InputPassword'

export default function RegisterForm() {
  return (
    <>
      <form className="mb-4 flex flex-col gap-4">
        <Input isRequired size="sm" variant="flat" type="text" label="Nom" />
        <Input isRequired size="sm" variant="flat" type="text" label="Prénom" />
        <Input isRequired size="sm" variant="flat" type="email" label="Email" />
        <InputPassword size="sm" variant="flat" label="Mot de passe" />
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
