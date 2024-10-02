import { APP_URL } from '@/const/const'
import { ROUTES } from '@/routes'
import { fullDate } from '@/utils/date'
import { Tailwind, Heading, Text, Link } from '@react-email/components'

type NewJoinActivityTemplateProps = {
  hostName: string
  attendeeId: string
  attendeeName: string
  activityTitle: string
  activityDate: Date
}
export const EmailNewJoinActivityTemplate = ({
  hostName,
  attendeeId,
  attendeeName,
  activityTitle,
  activityDate,
}: NewJoinActivityTemplateProps) => {
  return (
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

      <Text>Bonjour {hostName},</Text>

      <Text>
        Je tenais à vous informer qu&apos;un nouveau participant s&apos;est
        inscrit pour l&apos;événement{' '}
        <span className="font-bold">{activityTitle}</span> qui aura lieu le {''}
        {fullDate(activityDate)}.
      </Text>

      <Text>Voici les informations du participant :</Text>

      <Text>
        Nom :{' '}
        <Link href={APP_URL + '/' + ROUTES.PROFILE(attendeeId)} target="_blank">
          {attendeeName}
        </Link>
      </Text>

      <Text>
        Merci de prendre en compte cette nouvelle inscription dans vos
        préparatifs.
      </Text>

      <Text>Cordialement,</Text>

      <Text>Equipe Matchi</Text>
    </Tailwind>
  )
}
