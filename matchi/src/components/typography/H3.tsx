'use client'

import { TypographyProps } from './H1'

export default function H3({ children, className }: TypographyProps) {
  return <h3 className={'text-lg ' + (className ?? '')}>{children}</h3>
}
