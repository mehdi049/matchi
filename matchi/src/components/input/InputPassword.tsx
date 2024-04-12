'use client'

import { Input, InputProps } from '@nextui-org/react'
import FontAwesome from '../fontAwesome/FontAwesome'
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react'

export default function InputPassword(props: InputProps) {
  const [isVisible, setIsVisible] = useState(false)
  const toggleVisibility = () => setIsVisible(!isVisible)

  return (
    <Input
      {...props}
      isRequired
      endContent={
        <button
          className="focus:outline-none"
          type="button"
          onClick={toggleVisibility}
        >
          {isVisible ? (
            <FontAwesome icon={faEyeSlash} />
          ) : (
            <FontAwesome icon={faEye} />
          )}
        </button>
      }
      type={isVisible ? 'text' : 'password'}
    />
  )
}
