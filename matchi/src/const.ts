import { NextAuthOptions } from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import FacebookProvider from 'next-auth/providers/facebook'

export const authOptions: NextAuthOptions = {
  providers: [
    FacebookProvider({
      clientId: process.env.FB_CLIENT_ID as string,
      clientSecret: process.env.FB_CLIENT_SECRET as string,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
}

export const ACTIVITY_TYPE_OPTIONS = [
  {
    value: 'public',
    label: 'Public (Ouvert à tout le monde)',
  },
  {
    value: 'private',
    label: 'Privée (Seulement par invitation)',
  },
]
