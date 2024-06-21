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
import { z } from 'zod'
import { zodCheck } from '@/utils/common-zod-check'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import IsLoadingMessage from '@/components/message/IsLoadingMessage'
import useGetInterests from '@/hooks/interest/useGetInterests'
import { ActivityResponse } from '@/types/ActivityResponse'
import { useRouter } from 'next/navigation'
import { ROUTES } from '@/routes'
import { slugifyString } from '@/utils/string'

const formInputs = z.object({
  activity: zodCheck(['optional']),
  city: zodCheck(['required']),
  date: zodCheck(['string']),
})

type SearchFormProps = {
  type?: 'activities' | 'profiles'
  className?: string
}
export const SearchForm = ({
  type = 'activities',
  className = '',
}: SearchFormProps) => {
  const router = useRouter()
  const { data, isLoading } = useGetInterests()

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(formInputs),
  })

  const handleSearchActivity = handleSubmit(
    async (form: z.infer<typeof formInputs>) => {
      if (type === 'activities')
        return router.push(
          ROUTES.ACTIVITIES_SEARCH(
            form.city ? (slugifyString(form.city) as string) : 'all',
            form.activity
              ? data?.body?.find(
                  (activity) => activity.id === parseInt(form.activity)
                )?.slug
              : 'all',
            slugifyString(form.date)
          )
        )
      return null
    }
  )

  return (
    <Card className={`w-full flex mb-4 max-w-2xl ${className}`}>
      <CardBody className="flex gap-2 sm:gap-0 md:flex-row">
        {isLoading && <IsLoadingMessage type="flat" />}
        {data?.body && (
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
                errorMessage={errors.activity?.message as string}
                isInvalid={
                  errors.activity?.message
                    ? (errors.activity?.message as string).length > 0
                    : false
                }
              >
                {(data?.body as ActivityResponse[]).map((activity) => {
                  return (
                    <SelectItem key={activity.id} value={activity.name}>
                      {activity.name}
                    </SelectItem>
                  )
                })}
              </Select>
            )}
          />
        )}
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
              errorMessage={errors.city?.message as string}
              isInvalid={
                errors.city?.message
                  ? (errors.city?.message as string).length > 0
                  : false
              }
              isRequired
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
          isDisabled={isLoading}
        >
          Rechercher
        </Button>
      </CardBody>
    </Card>
  )
}
