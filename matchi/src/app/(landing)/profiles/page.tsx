'use client'

import ProfileCard from '@/components/profile/ProfileCard'
import { Button, Card, CardBody, Select, SelectItem } from '@nextui-org/react'
import cities from '../../../data/cities.json'
import activities from '../../../data/activities.json'
import H3 from '@/components/typography/H3'

export default function Page() {
  const getRandomInt = (max: number) => {
    return Math.floor(Math.random() * max)
  }
  const randomNumber = getRandomInt(8)
  return (
    <div>
      <Card className="flex w-full gap-2 mb-4 max-w-xl">
        <CardBody className="flex md:flex-row">
          <Select
            label="Activité"
            placeholder="Séléctionnez une activité"
            size="sm"
            radius="none"
          >
            {activities.map((activity) => (
              <SelectItem key={activity.value} value={activity.value}>
                {activity.label}
              </SelectItem>
            ))}
          </Select>
          <Select
            isRequired
            label="Ville"
            placeholder="Selectionnez une ville"
            size="sm"
            radius="none"
          >
            {cities.map((city) => (
              <SelectItem key={city.name} value={city.name}>
                {city.name}
              </SelectItem>
            ))}
          </Select>

          <Button
            size="lg"
            variant="flat"
            radius="none"
            className="bg-gray-300"
          >
            Rechercher
          </Button>
        </CardBody>
      </Card>

      <H3 className="mb-4">Padel / Tunis</H3>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
        {[...Array(20).keys()].map((x, key) => {
          return <ProfileCard key={key} />
        })}
      </div>
    </div>
  )
}
