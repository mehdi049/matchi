'use client'

import {
  Button,
  Link,
  Navbar,
  NavbarBrand,
  NavbarContent,
  Select,
  SelectItem,
} from '@nextui-org/react'
import cities from '../../data/cities.json'
import FontAwesome from '../fontAwesome/FontAwesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import SignInMenu from './SignInMenu'
import SignedInMenu from './SignedInMenu'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { ROUTES } from '@/routes'
import { ActivityResponse } from '@/types/ActivityResponse'
import IsLoadingMessage from '../message/IsLoadingMessage'
import useGetInterests from '@/hooks/interest/useGetInterests'

export default function NavbarTop() {
  const { data, isLoading } = useGetInterests()

  const router = useRouter()
  const { data: session } = useSession()

  return (
    <Navbar maxWidth="full" className="bg-white shadow-md">
      <NavbarContent>
        <NavbarBrand>
          <Link
            onClick={() => {
              router.push(ROUTES.HOME)
            }}
            className="font-bold text-inherit cursor-pointer"
          >
            MATCHI
          </Link>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent as="div" className="hidden" justify="center">
        {isLoading && <IsLoadingMessage type="flat" />}
        {data?.body && (
          <Select
            label="Activité"
            placeholder="Séléctionnez une activité"
            size="sm"
            radius="none"
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
        <Select
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
          isIconOnly
          variant="flat"
          aria-label="confirm"
          size="lg"
          radius="none"
        >
          <FontAwesome icon={faSearch} />
        </Button>
      </NavbarContent>
      <NavbarContent justify="end">
        {session ? <SignedInMenu /> : <SignInMenu />}
      </NavbarContent>
    </Navbar>
  )
}
