import { z } from 'zod'

type ZodCheckTypes =
  | 'optional'
  | 'string'
  | 'url'
  | 'number'
  | 'date'
  | 'date-future'
  | 'datetime'
  | 'required'
  | 'email'
  | 'gender'
export const zodCheck = (checks: ZodCheckTypes[]) => {
  if (checks.includes('gender')) return z.enum(['Male', 'Female'])
  if (checks.includes('number')) return z.coerce.number()

  let zodCheck: any = z.string(
    checks.includes('required') ? { required_error: 'Champ obligatoir.' } : {}
  )

  if (checks.includes('required'))
    zodCheck = zodCheck.min(1, { message: 'Champ obligatoir.' })

  if (checks.includes('date')) zodCheck = zodCheck.date('Date invalide.')
  if (checks.includes('date-future'))
    zodCheck = zodCheck.date('Date invalide.').refine(
      (date: string) => {
        const currentDate = new Date()
        currentDate.setHours(0)
        currentDate.setMinutes(0)
        currentDate.setSeconds(0)
        return new Date(date) >= currentDate
      },
      {
        message: 'La date de début doit être postérieure.',
      }
    )
  if (checks.includes('datetime'))
    zodCheck = zodCheck.datetime('Heure invalide.')
  if (checks.includes('email'))
    zodCheck = zodCheck.email({ message: 'Email invalid.' })
  if (checks.includes('url'))
    zodCheck = zodCheck.url({ message: 'Lien invalid.' })
  if (checks.includes('optional')) zodCheck = zodCheck.optional()

  return zodCheck
}
