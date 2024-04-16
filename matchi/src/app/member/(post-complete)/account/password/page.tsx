'use client'

import InputPassword from '@/components/input/InputPassword'
import H2 from '@/components/typography/H2'
import H3 from '@/components/typography/H3'
import { Button, Card, CardBody, Input, Link } from '@nextui-org/react'

export default function Page() {
  return (
    <Card className="w-full">
      <CardBody className="flex gap-4 flex-col">
        <H2>Modifier mon mot de passe</H2>

        <form className="mb-4 flex flex-col gap-4">
          <InputPassword
            size="sm"
            variant="flat"
            type="password"
            label="Mot de passe actuel"
          />
          <InputPassword
            size="sm"
            variant="flat"
            type="password"
            label="Nouveau mot de passe"
          />
          <InputPassword
            size="sm"
            variant="flat"
            type="password"
            label="Confirmer mon nouveau mot de passe"
          />
        </form>

        <div className="flex justify-end w-full mt-8">
          <Button variant="solid" color="primary" className="max-w-24">
            Valider
          </Button>
        </div>
      </CardBody>
    </Card>
  )
}
