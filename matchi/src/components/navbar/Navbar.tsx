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
import activities from '../../data/activities.json'
import FontAwesome from '../fontAwesome/FontAwesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import SignInMenu from './SignInMenu'
import { useState } from 'react'
import SignedInMenu from './SignedInMenu'

export default function NavbarTop() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  return (
    <Navbar maxWidth="full" className="bg-white shadow-md">
      <NavbarContent>
        <NavbarBrand>
          <Link href="/" className="font-bold text-inherit">
            MATCHI
          </Link>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent
        as="div"
        //className="hidden md:flex gap-0 w-full max-w-md"
        className="hidden"
        justify="center"
      >
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
        {isLoggedIn ? <SignedInMenu /> : <SignInMenu />}
      </NavbarContent>
    </Navbar>
  )
}
