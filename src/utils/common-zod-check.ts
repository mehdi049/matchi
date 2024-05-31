import { z } from 'zod'

type ZodCheckTypes =
  | 'string'
  | 'url'
  | 'number'
  | 'date'
  | 'datetime'
  | 'required'
  | 'email'
  | 'gender'
export const zodCheck = (checks: ZodCheckTypes[]) => {
  if (checks.includes('gender')) return z.enum(['M', 'F'])
  if (checks.includes('number')) return z.coerce.number()

  let zodCheck: any = z.string(
    checks.includes('required') ? { required_error: 'Champ obligatoir.' } : {}
  )

  if (checks.includes('required'))
    zodCheck = zodCheck.min(1, { message: 'Champ obligatoir.' })

  if (checks.includes('date')) zodCheck = zodCheck.date('Date invalide.')
  if (checks.includes('datetime'))
    zodCheck = zodCheck.datetime('Heure invalide.')
  if (checks.includes('email'))
    zodCheck = zodCheck.email({ message: 'Email invalid.' })
  if (checks.includes('url'))
    zodCheck = zodCheck.url({ message: 'Lien invalid.' })

  return zodCheck
}