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
import activities from '../../../../data/activities.json'
import ErrorMessage from '@/components/message/ErrorMessage'
import { useState } from 'react'
import { zodCheck } from '@/utils/common-zod-check'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Controller, useForm } from 'react-hook-form'

const FormInputs = z.object({
  fName: zodCheck(['required']),
  lName: zodCheck(['required']),
  birthday: zodCheck(['required', 'date']),
  bio: zodCheck(['string']),
  gender: zodCheck(['gender']),

  country: zodCheck(['string']),
  city: zodCheck(['required']),
  county: zodCheck(['required']),
})

export default function Page() {
  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(FormInputs),
  })

  const [selectedActivities, setSelectedActivities] = useState<string[]>([])
  const [isErrorVisible, setIsErrorVisible] = useState<boolean>(false)

  const handleAddRemoveActivity = (activity: string) => {
    if (activity) {
      let _selectedActivities = [...selectedActivities]

      //if selected
      if (_selectedActivities.includes(activity))
        _selectedActivities = _selectedActivities.filter((x) => x !== activity)
      //if not selected
      else _selectedActivities.push(activity)

      setSelectedActivities(_selectedActivities)
    }
  }

  const handleSaveProfile = handleSubmit((data) => {
    setIsErrorVisible(false)
    if (selectedActivities.length > 0) {
      // TODO
    } else setIsErrorVisible(true)
  })

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
            {...register('lName')}
            isRequired
            size="sm"
            variant="flat"
            type="text"
            label="Nom"
            value="Marouani"
            errorMessage={errors.lName?.message as string}
            isInvalid={
              errors.lName?.message
                ? (errors.lName?.message as string).length > 0
                : false
            }
          />
          <Input
            {...register('fName')}
            isRequired
            size="sm"
            variant="flat"
            type="text"
            label="Prénom"
            value="Mehdi"
            errorMessage={errors.fName?.message as string}
            isInvalid={
              errors.fName?.message
                ? (errors.fName?.message as string).length > 0
                : false
            }
          />
          <Input
            {...register('birthday')}
            isRequired
            size="sm"
            variant="flat"
            type="date"
            label="Date de naissance"
            errorMessage={errors.birthday?.message as string}
            isInvalid={
              errors.birthday?.message
                ? (errors.birthday?.message as string).length > 0
                : false
            }
          />
          <Textarea
            {...register('bio')}
            variant="flat"
            label="Bio"
            placeholder="Écrivez un peu sur vous"
          />
          <Controller
            control={control}
            name="gender"
            defaultValue="M"
            render={({ field }) => (
              <RadioGroup label="Sexe" {...field}>
                <Radio value="M">Homme</Radio>
                <Radio value="F">Femme</Radio>
              </RadioGroup>
            )}
          />
        </form>

        <H3>Adresse</H3>

        <form className="mb-4 flex flex-col gap-4">
          <Input
            {...register('country')}
            readOnly
            isRequired
            size="sm"
            variant="flat"
            type="text"
            label="Pays"
            value="Tunisie"
          />
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
        </form>

        <H3>Mes centres d&apos;intérêt</H3>

        <div className="flex gap-2 flex-wrap mt-4">
          {activities.map((activity, key) => {
            return (
              <div
                className="inline-block cursor-pointer"
                key={key}
                onClick={() =>
                  handleAddRemoveActivity(activity.value as string)
                }
              >
                {selectedActivities.includes(activity.value as string) ? (
                  <Chip
                    startContent={<FontAwesome icon={faCircleCheck} />}
                    color="primary"
                    size="lg"
                  >
                    {activity.label}
                  </Chip>
                ) : (
                  <Chip size="lg" variant="flat">
                    {activity.label}
                  </Chip>
                )}
              </div>
            )
          })}
        </div>

        <ErrorMessage isVisible={isErrorVisible}>
          Sélectionnez au moin une activité.
        </ErrorMessage>

        <div className="flex justify-end w-full mt-8">
          <Button
            variant="solid"
            color="primary"
            className="max-w-24"
            onClick={() => handleSaveProfile()}
          >
            Valider
          </Button>
        </div>
      </CardBody>
    </Card>
  )
}
