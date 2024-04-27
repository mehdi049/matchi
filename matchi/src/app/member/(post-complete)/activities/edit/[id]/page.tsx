'use client'

import H2 from '@/components/typography/H2'
import {
  Button,
  Card,
  CardBody,
  Checkbox,
  Input,
  Select,
  SelectItem,
  Textarea,
} from '@nextui-org/react'
import cities from '../../../../../../data/cities.json'
import acitivities from '../../../../../../data/activities.json'
import H3 from '@/components/typography/H3'
import { ACTIVITY_TYPE_OPTIONS } from '@/const'

export default function Page() {
  return (
    <Card className="w-full">
      <CardBody className="flex gap-4 flex-col">
        <H2>Modifier </H2>

        <form className="mb-4 flex flex-col gap-4">
          <Select
            isRequired
            label="Activité"
            placeholder="Selectionnez une activité"
            size="sm"
          >
            {acitivities.map((activity) => (
              <SelectItem key={activity.value} value={activity.value}>
                {activity.label}
              </SelectItem>
            ))}
          </Select>
          <Textarea
            variant="flat"
            label="Description"
            placeholder="Description de l'activité"
          />

          <H3>Adresse</H3>
          <Select
            isRequired
            label="Ville"
            placeholder="Selectionnez une ville"
            size="sm"
          >
            {cities.map((city) => (
              <SelectItem key={city.name} value={city.name}>
                {city.name}
              </SelectItem>
            ))}
          </Select>
          <Input
            size="sm"
            variant="flat"
            type="text"
            label="Lieux de l'activité"
            placeholder="Nom du terrain, point de rassemblement, etc."
          />
          <Input
            size="sm"
            variant="flat"
            type="text"
            label="Attachez un lien vers Google Maps"
            placeholder="https://maps.app.goo.gl/U4y8ayyWdz4s4pLj7"
          />

          <H3>Date</H3>
          <Input size="sm" variant="flat" type="date" label="Date" />
          <div className="flex gap-2">
            <Input size="sm" variant="flat" type="time" label="Commence à" />
            <Input size="sm" variant="flat" type="time" label="Se termine à" />
          </div>

          <H3>Participants</H3>
          <div className="flex flex-col gap-2">
            <Input
              size="sm"
              variant="flat"
              type="number"
              label="Nombre de participants"
            />
            <Checkbox size="sm">Illimité</Checkbox>
          </div>
          <H3>Prix</H3>
          <div className="flex flex-col gap-2">
            <Input
              size="sm"
              variant="flat"
              type="number"
              label="Prix par personne"
              endContent={<p className="text-sm">TND</p>}
            />
            <Checkbox size="sm">Gratuit</Checkbox>
          </div>

          <H3>Type de l&apos;activité</H3>
          <Select
            isRequired
            label="Type"
            placeholder="Type de l'activité"
            size="sm"
            defaultSelectedKeys={['public']}
            description={
              <>
                <p className="text-gray-900">
                  <span className="font-bold">Public:</span> Tout le monde peut
                  rejoindre votre activité.
                </p>{' '}
                <p className="text-gray-900">
                  <span className="font-bold">Privée:</span> Les participants ne
                  peuvent rejoindre votre activité que par invitation.
                </p>
              </>
            }
          >
            {ACTIVITY_TYPE_OPTIONS.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </Select>
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
