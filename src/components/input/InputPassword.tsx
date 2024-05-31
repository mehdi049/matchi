'use client'

import { Input } from '@nextui-org/react'
import FontAwesome from '../fontAwesome/FontAwesome'
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'
import { ReactNode, useState } from 'react'
import { UseFormRegisterReturn } from 'react-hook-form'

type InputPasswordProps = {
  isRequired?: boolean
  size: 'sm' | 'md' | 'lg' | undefined
  variant?: 'flat' | 'bordered' | 'faded' | 'underlined' | undefined
  label?: ReactNode
  errorMessage?: string
  register?: UseFormRegisterReturn
  className?: string
}
export default function InputPassword({
  isRequired,
  size,
  variant,
  label,
  errorMessage,
  register,
  className,
}: InputPasswordProps) {
  const [isVisible, setIsVisible] = useState(false)
  const toggleVisibility = () => setIsVisible(!isVisible)

  return (
    <Input
      {...register}
      size={size}
      variant={variant}
      label={label}
      className={className}
      isRequired={isRequired}
      errorMessage={errorMessage}
      isInvalid={errorMessage ? true : false}
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
