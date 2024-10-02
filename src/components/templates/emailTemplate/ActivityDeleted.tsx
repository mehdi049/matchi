import * as React from 'react'
import { Text, Tailwind, Heading } from '@react-email/components'

type EmailActivityDeletedTemplateProps = {
  firstName: string
  activityTitle: string
}

export const EmailActivityDeletedTemplate = ({
  firstName,
  activityTitle,
}: EmailActivityDeletedTemplateProps) => (
  <Tailwind
    config={{
      theme: {
        extend: {
          colors: {
            brand: '#007291',
          },
        },
      },
    }}
  >
    <Heading
      as="h1"
      className="mb-4 border-solid border-b border-l-0 border-t-0 border-r-0 border-gray-200 py-2"
    >
      Matchi
    </Heading>

    <Text>Chère/Cher {firstName},</Text>
    <Text>
      Nous vous informons que l&apos;activité{' '}
      <span className="underline">{activityTitle}</span> que vous participerez a
      été supprimée.
    </Text>
    <Text>
      Nous comprenons les désagréments que cela peut causer et nous vous
      remercions de votre compréhension et de votre flexibilité.
    </Text>

    <Text>Merci de votre attention,</Text>

    <Text>Bonne journée et à bientôt,</Text>
    <Text>Equipe Matchi</Text>
  </Tailwind>
)
