import * as React from 'react'
import { Text, Tailwind, Heading } from '@react-email/components'

type EmailTemplateProps = {
  firstName: string
}

export const EmailTemplateWelcome = ({ firstName }: EmailTemplateProps) => (
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
      Nous sommes ravis de vous accueillir chez Matchi ! Merci de vous être
      inscrit(e) et de faire partie de notre communauté.
    </Text>
    <Text>
      Vous pouvez dès maintenant profiter de nos services en vous connectant à
      votre compte. Voici quelques ressources pour vous aider à démarrer :
    </Text>

    <Text>
      Accès à votre compte : Vous pouvez vous connecter à votre compte en
      utilisant votre adresse e-mail et le mot de passe que vous avez créé lors
      de l&apos;inscription.
    </Text>
    <Text>
      Support client : Notre équipe de support est disponible pour répondre à
      toutes vos questions. Vous pouvez nous contacter par e-mail à [adresse
      e-mail] ou par téléphone au [numéro de téléphone].
    </Text>
    <Text>
      Ressources utiles : N&apos;hésitez pas à consulter notre centre
      d&apos;aide à l&apos;adresse [URL du centre d&apos;aide] pour des guides
      et des articles utiles.
    </Text>

    <Text>
      Si vous avez des questions ou avez besoin d&apos;aide, n&apos;hésitez pas
      à contacter notre support à l&apos;adresse [adresse email de support] ou
      en visitant notre page de contact [lien vers la page de contact].
    </Text>

    <Text>Encore une fois, bienvenue à bord !</Text>

    <Text>Bonne journée et à bientôt,</Text>
    <Text>Equipe Matchi</Text>
  </Tailwind>
)
