'use client'

import { TypographyProps } from './H1'

export default function H2({ children, className }: TypographyProps) {
  return <h3 className={'text-xl ' + (className ?? '')}>{children}</h3>
}
