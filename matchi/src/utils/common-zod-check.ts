import { z } from 'zod'

type ZodCheckTypes = 'string' | 'date' | 'required' | 'email' | 'gender'
export const zodCheck = (checks: ZodCheckTypes[]) => {
  if (checks.includes('gender')) return z.enum(['M', 'F'])

  let zodCheck = z.string()

  if (checks.includes('required'))
    zodCheck = zodCheck.min(1, { message: 'Champ obligatoir.' })

  if (checks.includes('date')) zodCheck = zodCheck.date('Date invalide.')
  if (checks.includes('email'))
    zodCheck = zodCheck.email({ message: 'Email invalid.' })

  return zodCheck
}
