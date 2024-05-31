'use client'

import {
  Button,
  Checkbox,
  Input,
  Select,
  SelectItem,
  Textarea,
} from '@nextui-org/react'
import cities from '../../data/cities.json'
import acitivities from '../../data/activities.json'
import H3 from '@/components/typography/H3'
import { ACTIVITY_TYPE_OPTIONS } from '@/const'
import { literal, string, union, z } from 'zod'
import { zodCheck } from '@/utils/common-zod-check'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

const FormInputs = z.object({
  activity: zodCheck(['required']),
  description: zodCheck(['string']),
  city: zodCheck(['required']),
  county: zodCheck(['required']),
  place: zodCheck(['required']),
  gmap: union([
    string().startsWith('https://maps.app.goo.gl/', {
      message: 'Lien vers Google Maps invalid',
    }),
    literal(''),
  ])
    .nullable()
    .optional(),
  date: zodCheck(['date', 'required']),
  start: zodCheck(['required']),
  end: zodCheck(['required']),
  participantsNum: zodCheck(['number']),
  price: zodCheck(['number']),
  type: zodCheck(['required']),
})

type ActivityFormProps = {
  activity?: unknown
}
export default function ActivityForm({ activity }: ActivityFormProps) {
  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(FormInputs),
  })

  const handleAddActivity = handleSubmit((data) => {})

  const handleUpdateActivity = handleSubmit((data) => {})

  return (
    <>
      <form className="mb-4 flex flex-col gap-4">
        <Controller
          control={control}
          name="activity"
          render={({ field }) => (
            <Select
              {...field}
              isRequired
              label="Activité"
              placeholder="Selectionnez une activité"
              size="sm"
              errorMessage={errors.activity?.message as string}
              isInvalid={
                errors.activity?.message
                  ? (errors.activity?.message as string).length > 0
                  : false
              }
            >
              {acitivities.map((activity) => (
                <SelectItem key={activity.value} value={activity.value}>
                  {activity.label}
                </SelectItem>
              ))}
            </Select>
          )}
        />
        <Textarea
          {...register('description')}
          variant="flat"
          label="Description"
          placeholder="Description de l'activité"
        />

        <H3>Adresse</H3>

        <Controller
          control={control}
          name="city"
          render={({ field }) => (
            <Select
              {...field}
              isRequired
              label="Ville"
              placeholder="Selectionnez une ville"
              size="sm"
              errorMessage={errors.city?.message as string}
              isInvalid={
                errors.city?.message
                  ? (errors.city?.message as string).length > 0
                  : false
              }
            >
              {cities.map((city) => (
                <SelectItem key={city.name} value={city.name}>
                  {city.name}
                </SelectItem>
              ))}
            </Select>
          )}
        />
        <Controller
          control={control}
          name="county"
          render={({ field }) => (
            <Select
              {...field}
              isRequired
              label="Municipalité"
              placeholder="Selectionnez une municipalité"
              size="sm"
              errorMessage={errors.county?.message as string}
              isInvalid={
                errors.county?.message
                  ? (errors.county?.message as string).length > 0
                  : false
              }
            >
              {(
                cities.find((city) => city.name === watch('city')) as any
              )?.counties.map((county: string) => (
                <SelectItem key={county} value={county}>
                  {county}
                </SelectItem>
              ))}
            </Select>
          )}
        />

        <Input
          {...register('place')}
          size="sm"
          variant="flat"
          type="text"
          label="Lieux de l'activité"
          placeholder="Nom du terrain, point de rassemblement, etc."
          errorMessage={errors.place?.message as string}
          isInvalid={
            errors.place?.message
              ? (errors.place?.message as string).length > 0
              : false
          }
        />
        <Input
          {...register('gmap')}
          size="sm"
          variant="flat"
          type="text"
          label="Attachez un lien vers Google Maps"
          placeholder="https://maps.app.goo.gl/U4y8ayyWdz4s4pLj7"
          errorMessage={errors.gmap?.message as string}
          isInvalid={
            errors.gmap?.message
              ? (errors.gmap?.message as string).length > 0
              : false
          }
        />

        <H3>Date</H3>
        <Input
          {...register('date')}
          size="sm"
          variant="flat"
          type="date"
          label="Date"
          errorMessage={errors.date?.message as string}
          isInvalid={
            errors.date?.message
              ? (errors.date?.message as string).length > 0
              : false
          }
        />
        <div className="flex gap-2">
          <Input
            {...register('start')}
            size="sm"
            variant="flat"
            type="time"
            label="Commence à"
            errorMessage={errors.start?.message as string}
            isInvalid={
              errors.start?.message
                ? (errors.start?.message as string).length > 0
                : false
            }
          />
          <Input
            {...register('end')}
            size="sm"
            variant="flat"
            type="time"
            label="Se termine à"
            errorMessage={errors.end?.message as string}
            isInvalid={
              errors.end?.message
                ? (errors.end?.message as string).length > 0
                : false
            }
          />
        </div>

        <H3>Participants</H3>
        <div className="flex flex-col gap-2">
          <Input
            {...register('participantsNum')}
            size="sm"
            variant="flat"
            type="number"
            label="Nombre de participants"
            errorMessage={errors.participantsNum?.message as string}
            isInvalid={
              errors.participantsNum?.message
                ? (errors.participantsNum?.message as string).length > 0
                : false
            }
          />
          <Checkbox size="sm">Illimité</Checkbox>
        </div>
        <H3>Prix</H3>
        <div className="flex flex-col gap-2">
          <Input
            {...register('price')}
            size="sm"
            variant="flat"
            type="number"
            label="Prix par personne"
            endContent={<p className="text-sm">TND</p>}
            errorMessage={errors.price?.message as string}
            isInvalid={
              errors.price?.message
                ? (errors.price?.message as string).length > 0
                : false
            }
          />
          <Checkbox size="sm">Gratuit</Checkbox>
        </div>

        <H3>Type de l&apos;activité</H3>
        <Controller
          control={control}
          name="type"
          render={({ field }) => (
            <Select
              {...field}
              isRequired
              label="Type"
              placeholder="Type de l'activité"
              size="sm"
              defaultSelectedKeys={['public']}
              description={
                <>
                  <p className="text-gray-900">
                    <span className="font-bold">Public:</span> Tout le monde
                    peut rejoindre votre activité.
                  </p>{' '}
                  <p className="text-gray-900">
                    <span className="font-bold">Privée:</span> Les participants
                    ne peuvent rejoindre votre activité que par invitation.
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
          )}
        />
      </form>

      <div className="flex justify-end w-full mt-8">
        <Button
          variant="solid"
          color="primary"
          className="max-w-24"
          onClick={activity ? handleUpdateActivity : handleAddActivity}
        >
          Valider
        </Button>
      </div>
    </>
  )
}
