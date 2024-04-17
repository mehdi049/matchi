'use client'

import H2 from '@/components/typography/H2'
import { Button, CardBody, Input, Select, SelectItem } from '@nextui-org/react'
import cities from '../../../../data/cities.json'
import { StepProps } from './basicInfoStep'

export default function MyAddressStep({ setStep }: StepProps) {
  return (
    <CardBody className="flex gap-4 flex-col">
      <H2>Mon adresse</H2>

      <form className="mb-4 flex flex-col gap-4">
        <Input
          readOnly
          isRequired
          size="sm"
          variant="flat"
          type="text"
          label="Pays"
          value="Tunisie"
        />
        <Select
          isRequired
          label="Ville"
          placeholder="Selectionnez une ville"
          size="sm"
          radius="none"
        >
          {cities.map((city) => (
            <SelectItem key={city.value} value={city.value}>
              {city.label}
            </SelectItem>
          ))}
        </Select>
        <Input size="sm" variant="flat" type="text" label="Rue" />
        <Input size="sm" variant="flat" type="text" label="Code postal" />
      </form>

      <div className="flex gap-2 justify-end w-full mt-8">
        <Button variant="light" className="max-w-24" onClick={() => setStep(1)}>
          Retour
        </Button>
        <Button
          variant="solid"
          color="primary"
          className="max-w-24"
          onClick={() => setStep(3)}
        >
          Continuer
        </Button>
      </div>
    </CardBody>
  )
}
