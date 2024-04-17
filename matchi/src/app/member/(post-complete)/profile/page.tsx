'use client'

import FontAwesome from '@/components/fontAwesome/FontAwesome'
import cities from '../../../../data/cities.json'
import H2 from '@/components/typography/H2'
import H3 from '@/components/typography/H3'
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
  Textarea,
} from '@nextui-org/react'

export default function Page() {
  return (
    <Card className="w-full">
      <CardBody className="flex gap-4 flex-col">
        <H2>Mon profil</H2>

        <H3>Information de base</H3>
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
            size="sm"
            variant="flat"
            type="text"
            label="Nom"
            value="Marouani"
          />
          <Input
            size="sm"
            variant="flat"
            type="text"
            label="Prénom"
            value="Mehdi"
          />
          <Input
            required
            size="sm"
            variant="flat"
            type="date"
            label="Date de naissance"
          />
          <Textarea
            variant="flat"
            label="Bio"
            placeholder="Écrivez un peu sur vous"
          />
          <RadioGroup label="Sexe" defaultValue="M">
            <Radio value="M">Homme</Radio>
            <Radio value="F">Femme</Radio>
          </RadioGroup>
        </form>

        <H3>Adresse</H3>

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

        <H3>Mes centres d&apos;intérêt</H3>
        <div className="flex gap-2 flex-wrap">
          <Chip
            startContent={<FontAwesome icon={faCircleCheck} />}
            color="primary"
            className="cursor-pointer"
            size="lg"
          >
            Football
          </Chip>
          <Chip size="lg" className="cursor-pointer" variant="flat">
            Tennis
          </Chip>
          <Chip size="lg" className="cursor-pointer" variant="flat">
            Sortie en moto
          </Chip>
          <Chip size="lg" className="cursor-pointer" variant="flat">
            Sortie en vélo
          </Chip>
          <Chip size="lg" className="cursor-pointer" variant="flat">
            Padel
          </Chip>
          <Chip size="lg" className="cursor-pointer" variant="flat">
            Basket
          </Chip>
        </div>
        <div className="flex justify-end w-full mt-8">
          <Button variant="solid" color="primary" className="max-w-24">
            Valider
          </Button>
        </div>
      </CardBody>
    </Card>
  )
}
