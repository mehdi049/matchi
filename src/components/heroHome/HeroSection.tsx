'use client'

import {
  Button,
  Card,
  CardBody,
  Input,
  Select,
  SelectItem,
} from '@nextui-org/react'
import cities from '../../data/cities.json'
import activities from '../../data/activities.json'
import { z } from 'zod'
import { zodCheck } from '@/utils/common-zod-check'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

const formInputs = z.object({
  activity: zodCheck(['string']),
  city: zodCheck(['string']),
  date: zodCheck(['string']),
})

export default function HeroSection() {
  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(formInputs),
  })

  const handleSearchActivity = handleSubmit((data) => {})

  return (
    <div
      style={{ backgroundImage: 'url(/bg-home/bg-home-4.jpg)' }}
      className="h-screen bg-center bg-cover -mt-16 flex justify-center items-center px-4"
    >
      <Card className="w-full flex mb-4 max-w-2xl">
        <CardBody className="flex gap-2 sm:gap-0 md:flex-row">
          <Controller
            control={control}
            name="activity"
            render={({ field }) => (
              <Select
                {...field}
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
            )}
          />
          <Controller
            control={control}
            name="city"
            render={({ field }) => (
              <Select
                {...field}
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
            )}
          />
          <Input
            {...register('date')}
            size="sm"
            variant="flat"
            type="date"
            label="Date"
            radius="none"
          />
          <Button
            size="lg"
            variant="flat"
            radius="none"
            className="bg-gray-900 text-white"
            onClick={handleSearchActivity}
          >
            Rechercher
          </Button>
        </CardBody>
      </Card>
    </div>
  )
}
