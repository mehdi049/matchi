import * as React from 'react'
import { Text, Tailwind, Heading, Link } from '@react-email/components'
import { ROUTES } from '@/routes'
import { APP_URL } from '@/const/const'

interface ActivityUpdateTemplateProps {
  firstName: string
  activityTitle: string
  activityId: number
}

export const ActivityUpdateTemplate = ({
  firstName,
  activityTitle,
  activityId,
}: ActivityUpdateTemplateProps) => (
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
      été modifiée.
    </Text>
    <Text>
      Vous pouvez consulté l&apos;activité mis à jour{' '}
      <Link href={APP_URL + '/' + ROUTES.ACTIVITY(activityId)} target="_blank">
        ici
      </Link>
      .
    </Text>
    <Text>
      Nous vous prions de bien vouloir prendre note de ces changements et
      d&apos;ajuster vos plans en conséquence. Nous comprenons les désagréments
      que cela peut causer et nous vous remercions de votre compréhension et de
      votre flexibilité.
    </Text>

    <Text>
      Nous nous réjouissons de vous voir lors de cet événement, et nous espérons
      que vous serez toujours en mesure de participer.
    </Text>
    <Text>Merci de votre attention,</Text>

    <Text>Bonne journée et à bientôt,</Text>
    <Text>Equipe Matchi</Text>
  </Tailwind>
)
