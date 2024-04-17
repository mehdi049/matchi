'use client'

import H2 from '@/components/typography/H2'
import H3 from '@/components/typography/H3'
import { Button, Card, CardBody, Input, Link } from '@nextui-org/react'

export default function Page() {
  return (
    <Card className="w-full">
      <CardBody className="flex gap-4 flex-col">
        <H2>Mon compte</H2>

        <form className="mb-4 flex flex-col gap-4">
          <Input
            size="sm"
            variant="flat"
            type="email"
            label="Email"
            value="mehdi.marouani@gmail.com"
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
          <Button variant="solid" color="primary" className="max-w-24">
            Valider
          </Button>
        </div>
      </CardBody>
    </Card>
  )
}
