'use client'

import { Button, Card, CardBody, Select, SelectItem } from '@nextui-org/react'
import cities from '../../data/cities.json'
import activities from '../../data/activities.json'

export default function HeroSection() {
  return (
    <div
      style={{ backgroundImage: 'url(/bg-home/bg-home-4.jpg)' }}
      className="h-screen bg-center bg-cover -mt-16 flex justify-center items-center"
    >
      <Card className="w-full flex mb-4 max-w-xl">
        <CardBody className="flex md:flex-row">
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
          <Button
            size="lg"
            variant="flat"
            radius="none"
            className="bg-gray-900 text-white"
          >
            Rechercher
          </Button>
        </CardBody>
      </Card>
    </div>
  )
}
