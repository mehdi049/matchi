'use client'

import {
  Button,
  Checkbox,
  Input,
  Link,
  Select,
  SelectItem,
  Textarea,
} from '@nextui-org/react'
import cities from '../../data/cities.json'
import H3 from '@/components/typography/H3'
import { ACTIVITY_TYPE_OPTIONS } from '@/const'
import { literal, string, union, z } from 'zod'
import { zodCheck } from '@/utils/common-zod-check'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import useAddActivity from '@/hooks/activity/useAddActivity'
import { ActivityResponse, AddedActivityResponse } from '@/types/User'
import { UserContext } from '@/app/member/context/UserContext'
import { useContext } from 'react'
import ErrorMessage from '../message/ErrorMessage'
import SuccessMessage from '../message/SuccessMessage'
import useGetInterests from '@/hooks/user/useGetInterests'
import IsLoadingMessage from '../message/IsLoadingMessage'
import { timeStringToDatetime } from '@/utils/date'
import { ROUTES } from '@/routes'
import { useRouter } from 'next/navigation'

const formInputs = z
  .object({
    activity: zodCheck(['required']),
    title: zodCheck(['required']),
    description: zodCheck(['string']),
    city: zodCheck(['required']),
    municipality: zodCheck(['required']),
    place: zodCheck(['required']),
    gmap: union([
      string().startsWith('https://maps.app.goo.gl/', {
        message: 'Lien vers Google Maps est invalid',
      }),
      literal(''),
    ])
      .nullable()
      .optional(),
    date: zodCheck(['date-future', 'required']),
    start: zodCheck(['required']),
    end: zodCheck(['required']),
    maxAttendees: zodCheck(['number']),
    price: zodCheck(['number']),
    type: zodCheck(['required']),
  })
  .refine((data) => data.start < data.end, {
    message: 'Date de fin invalid.',
    path: ['start_end'],
  })

type ActivityFormProps = {
  activity?: AddedActivityResponse
}
export default function ActivityForm({ activity }: ActivityFormProps) {
  const router = useRouter()
  const { user } = useContext(UserContext)

  const { mutate, isPending, isError, error, isSuccess } = useAddActivity({})
  const { data, isLoading } = useGetInterests()

  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(formInputs),
  })

  const handleAddActivity = handleSubmit((data) => {
    const selectedDate = new Date(data.date)
    mutate({
      activity: {
        title: data.title,
        description: data.description,

        country: 'Tunisia',
        city: data.city,
        municipality: data.municipality,

        place: data.place,
        googleMap: data.googleMap,

        date: selectedDate,
        start: new Date(timeStringToDatetime(selectedDate, data.start) as any),
        end: new Date(timeStringToDatetime(selectedDate, data.end) as any),

        maxAttendees: data.maxAttendees,

        price: data.price,
        currency: 'TND',

        type: data.type,

        activityId: parseInt(data.activity),
        userId: user.id,
        status: 'Active',
      },
    })
  })

  const handleUpdateActivity = handleSubmit((data) => {})

  return (
    <>
      <form className="mb-4 flex flex-col gap-4">
        {isLoading && <IsLoadingMessage type="flat" />}
        {data?.body && (
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
        <Input
          {...register('title')}
          name="title"
          type="text"
          size="sm"
          isRequired
          variant="flat"
          label="Titre"
          placeholder="Titre de l'activité"
          errorMessage={errors.title?.message as string}
          isInvalid={
            errors.title?.message
              ? (errors.title?.message as string).length > 0
              : false
          }
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
          name="municipality"
          render={({ field }) => (
            <Select
              {...field}
              isRequired
              label="Municipalité"
              placeholder="Selectionnez une municipalité"
              size="sm"
              errorMessage={errors.municipality?.message as string}
              isInvalid={
                errors.municipality?.message
                  ? (errors.municipality?.message as string).length > 0
                  : false
              }
            >
              {(
                cities.find((city) => city.name === watch('city')) as any
              )?.municipalities.map((municipality: string) => (
                <SelectItem key={municipality} value={municipality}>
                  {municipality}
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
            errorMessage={
              (errors.end?.message as string) ||
              (errors.start_end?.message as string)
            }
            isInvalid={
              errors.end?.message
                ? (errors.end?.message as string).length > 0
                : errors.start_end?.message
                ? (errors.start_end?.message as string).length > 0
                : false
            }
          />
        </div>

        <H3>Participants</H3>
        <div className="flex flex-col gap-2">
          <Input
            {...register('maxAttendees')}
            size="sm"
            variant="flat"
            type="number"
            label="Nombre de participants"
            errorMessage={errors.maxAttendees?.message as string}
            isInvalid={
              errors.maxAttendees?.message
                ? (errors.maxAttendees?.message as string).length > 0
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
          defaultValue={'Public'}
          render={({ field }) => (
            <Select
              {...field}
              isRequired
              label="Type"
              placeholder="Type de l'activité"
              size="sm"
              defaultSelectedKeys={['Public']}
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
          isLoading={isPending}
        >
          Valider
        </Button>
      </div>

      <ErrorMessage isVisible={isError && !isPending}>
        {error?.message}
      </ErrorMessage>

      <SuccessMessage isVisible={isSuccess && !isPending}>
        Votre activité est créé avec succés!
        <Link
          onClick={() => {
            router.push(ROUTES.MEMBER.MY_ACTIVITIES)
          }}
          underline="always"
          className="text-white font-medium block mt-2 cursor-pointer"
          size="sm"
        >
          Voir mes activités
        </Link>
      </SuccessMessage>
    </>
  )
}
