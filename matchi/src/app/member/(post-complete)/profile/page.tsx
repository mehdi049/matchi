'use client'

import FontAwesome from '@/components/fontAwesome/FontAwesome'
import H2 from '@/components/typography/H2'
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons'
import {
  Avatar,
  Button,
  Card,
  CardBody,
  Chip,
  Input,
  Radio,
  RadioGroup,
  Select,
  SelectItem,
} from '@nextui-org/react'
import { useState } from 'react'

export default function Page() {
  const [step, setStep] = useState(1)

  return (
    <Card className="w-full">
      {step === 1 && (
        <CardBody className="flex gap-4 flex-col">
          <H2>Mes informations de base</H2>

          <div className="flex gap-2">
            <Avatar
              src="https://i.pravatar.cc/150?u=a04258114e29026708c"
              className="w-40 h-40"
            />
            <div className=" place-content-end">
              <Button size="sm" variant="ghost" color="primary">
                Modifier
              </Button>
            </div>
          </div>

          <form className="mb-4 flex flex-col gap-4">
            <Input
              readOnly
              size="sm"
              variant="flat"
              type="text"
              label="Nom"
              value="Marouani"
            />
            <Input
              readOnly
              size="sm"
              variant="flat"
              type="text"
              label="Prénom"
              value="Mehdi"
            />
            <Input
              readOnly
              size="sm"
              variant="flat"
              type="email"
              label="Email"
              value="mehdi.marouani@gmail.com"
            />
            <Input
              required
              size="sm"
              variant="flat"
              type="date"
              label="Date de naissance"
            />
            <RadioGroup label="Sexe" defaultValue="M">
              <Radio value="M">Homme</Radio>
              <Radio value="F">Femme</Radio>
            </RadioGroup>
          </form>

          <div className="flex justify-end w-full mt-8">
            <Button
              variant="solid"
              color="primary"
              className="max-w-24"
              onClick={() => setStep(2)}
            >
              Continuer
            </Button>
          </div>
        </CardBody>
      )}
    </Card>
  )
}
