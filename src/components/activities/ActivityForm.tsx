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
import { literal, string, union, z } from 'zod'
import { zodCheck } from '@/utils/common-zod-check'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import useAddActivity from '@/hooks/activity/useAddActivity'
import { AddedActivityResponse } from '@/types/AddedActivityResponse'
import { ActivityResponse } from '@/types/ActivityResponse'
import { useContext, useState } from 'react'
import ErrorMessage from '../message/ErrorMessage'
import SuccessMessage from '../message/SuccessMessage'
import useGetInterests from '@/hooks/interest/useGetInterests'
import IsLoadingMessage from '../message/IsLoadingMessage'
import {
  dateConverterInput,
  extractHourFromDate,
  extractMinuteFromDate,
  timeStringToDatetime,
} from '@/utils/date'
import { ROUTES } from '@/routes'
import { useRouter } from 'next/navigation'
import useUpdateActivity from '@/hooks/activity/useUpdateActivity'
import { ACTIVITY_TYPE_OPTIONS } from '@/const/activity_type_options'
import { UserContext } from '@/app/member/context/UserContext'
import { getQueryClient } from '@/lib/getQueryClient'
import { QUERY_KEYS } from '@/const/query_keys'

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
  const { user, refetchUser } = useContext(UserContext)
  /*const [selectedCity, setSelectedCity] = useState(
    activity ? activity.city : ''
  )*/
  const selectedCity = activity ? activity.city : ''

  const {
    mutate: mutateAdd,
    isPending: isPendingAdd,
    isError: isErrorAdd,
    error: errorAdd,
    isSuccess: isSuccessAdd,
  } = useAddActivity({
    onSuccess: () => refetchUser(),
  })

  const {
    mutate: mutateUpdate,
    isPending: isPendingUpdate,
    isError: isErrorUpdate,
    error: errorUpdate,
    isSuccess: isSuccessUpdate,
  } = useUpdateActivity({
    onSuccess: () => {
      getQueryClient().invalidateQueries({
        queryKey: [QUERY_KEYS.ACTIVITY_ID, activity?.id],
      })
      getQueryClient().invalidateQueries({ queryKey: [QUERY_KEYS.ACTIVITIES] })
      getQueryClient().invalidateQueries({
        queryKey: [QUERY_KEYS.ACTIVITIES_BY_TYPE],
      })
      refetchUser()
    },
  })

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

  const [isMaxAttendeesDisabled, setIsMaxAttendeesDisabled] = useState(false)
  const [isFree, setIsFree] = useState(false)

  const handleAddActivity = handleSubmit(
    async (data: z.infer<typeof formInputs>) => {
      const selectedDate = new Date(data.date)
      mutateAdd({
        activity: {
          title: data.title,
          description: data.description,

          country: 'Tunisia',
          city: data.city,
          municipality: data.municipality,

          place: data.place,
          googleMap: data.gmap as string | undefined,

          date: selectedDate,
          start: new Date(
            timeStringToDatetime(selectedDate, data.start) as any
          ),
          end: new Date(timeStringToDatetime(selectedDate, data.end) as any),

          maxAttendees: isMaxAttendeesDisabled ? null : data.maxAttendees,

          price: isFree || data.price === 0 ? null : data.price,
          currency: 'TND',

          type: data.type,

          activityId: parseInt(data.activity),
          userId: user.id,
          status: 'Active',
        },
      })
    }
  )

  const handleUpdateActivity = handleSubmit(
    async (data: z.infer<typeof formInputs>) => {
      const selectedDate = new Date(data.date)
      mutateUpdate({
        id: activity?.id as number,
        activity: {
          title: data.title,
          description: data.description,

          country: 'Tunisia',
          city: data.city,
          municipality: data.municipality,

          place: data.place,
          googleMap: data.gmap as string | undefined,

          date: selectedDate,
          start: new Date(
            timeStringToDatetime(selectedDate, data.start) as any
          ),
          end: new Date(timeStringToDatetime(selectedDate, data.end) as any),

          maxAttendees: isMaxAttendeesDisabled ? null : data.maxAttendees,

          price: isFree || data.price === 0 ? null : data.price,
          currency: 'TND',

          type: data.type,

          activityId: parseInt(data.activity),
          userId: user.id,
          status: 'Active',
        },
      })
    }
  )

  return (
    <>
      <form className="mb-4 flex flex-col gap-4">
        {isLoading && <IsLoadingMessage type="flat" />}
        {data?.body && (
          <Controller
            control={control}
            name="activity"
            defaultValue={
              activity && activity.activity
                ? activity.activity.id.toString()
                : ''
            }
            render={({ field }) => (
              <Select
                {...field}
                isRequired
                label="Activité"
                placeholder="Selectionnez une activité"
                size="sm"
                errorMessage={errors.activity?.message as string}
                defaultSelectedKeys={
                  activity && activity.activity
                    ? [activity.activity.id.toString()]
                    : []
                }
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
          defaultValue={activity ? activity.title : ''}
        />
        <Textarea
          {...register('description')}
          variant="flat"
          label="Description"
          placeholder="Description de l'activité"
          defaultValue={activity ? activity.description : ''}
        />

        <H3>Adresse</H3>

        <Controller
          control={control}
          name="city"
          defaultValue={activity ? activity.city : ''}
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
              defaultSelectedKeys={activity ? [activity.city] : []}
              /*onChange={(event) => {
                setSelectedCity(event.target.value)
              }}*/
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
          defaultValue={activity ? activity.municipality : ''}
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
              defaultSelectedKeys={activity ? [activity.municipality] : []}
            >
              {(
                cities.find(
                  (city) =>
                    city.name === (selectedCity ? selectedCity : watch('city'))
                ) as any
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
          isRequired
          variant="flat"
          type="text"
          label="Lieu d'activité"
          placeholder="Nom du terrain, point de rassemblement, etc."
          errorMessage={errors.place?.message as string}
          isInvalid={
            errors.place?.message
              ? (errors.place?.message as string).length > 0
              : false
          }
          defaultValue={activity ? activity.place : ''}
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
          defaultValue={activity ? activity.googleMap : ''}
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
          defaultValue={activity && dateConverterInput(activity.date)}
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
            defaultValue={
              activity
                ? `${extractHourFromDate(
                    activity.start
                  )}:${extractMinuteFromDate(activity.start)}`
                : ''
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
            defaultValue={
              activity
                ? `${extractHourFromDate(activity.end)}:${extractMinuteFromDate(
                    activity.end
                  )}`
                : ''
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
            label="Nombre maximum de participants"
            errorMessage={errors.maxAttendees?.message as string}
            isInvalid={
              errors.maxAttendees?.message
                ? (errors.maxAttendees?.message as string).length > 0
                : false
            }
            min={2}
            isDisabled={isMaxAttendeesDisabled}
            defaultValue={
              activity && activity.maxAttendees
                ? activity.maxAttendees.toString()
                : ''
            }
          />
          <Checkbox
            size="sm"
            onValueChange={(isSelected) => {
              setIsMaxAttendeesDisabled(isSelected)
            }}
            defaultSelected={
              activity &&
              (!activity.maxAttendees || activity.maxAttendees === 0)
            }
          >
            Illimité
          </Checkbox>
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
            min={0}
            isDisabled={isFree}
            defaultValue={
              activity && activity.price ? activity.price.toString() : ''
            }
          />
          <Checkbox
            size="sm"
            onValueChange={(isSelected) => {
              setIsFree(isSelected)
            }}
            defaultSelected={
              activity && (!activity.price || activity.price === 0)
            }
          >
            Gratuit
          </Checkbox>
        </div>

        <H3>Type de l&apos;activité</H3>
        <Controller
          control={control}
          name="type"
          defaultValue={activity ? activity.type : 'Public'}
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
          isLoading={isPendingAdd || isPendingUpdate}
        >
          Valider
        </Button>
      </div>

      <ErrorMessage isVisible={isErrorAdd && !isPendingAdd}>
        {errorAdd?.message}
      </ErrorMessage>

      <ErrorMessage isVisible={isErrorUpdate && !isPendingUpdate}>
        {errorUpdate?.message}
      </ErrorMessage>

      <SuccessMessage isVisible={isSuccessAdd && !isPendingAdd}>
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

      <SuccessMessage isVisible={isSuccessUpdate && !isPendingUpdate}>
        Votre activité est modifié avec succés!
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
