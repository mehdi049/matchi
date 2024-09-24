import { ROUTES } from '@/routes'
import { loginUser } from '@/services/public'
import { PrismaAdapter } from '@auth/prisma-adapter'

import NextAuth, { User } from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import facebook from 'next-auth/providers/facebook'
import Google from 'next-auth/providers/google'

import prisma from './prisma'
import { EmailTemplateWelcome } from '@/components/templates/emailTemplate/Welcome'
import { sendEmail } from '@/app/actions'

export const { handlers, signIn, signOut, auth } = NextAuth({
  debug: true,
  adapter: PrismaAdapter(prisma),
  session: { strategy: 'jwt', maxAge: 24 * 60 * 60 },
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async session({ session, token }) {
      if (token && session.user) session.user.id = token.id as string
      return session
    },
    async jwt({ token, account, profile, isNewUser }) {
      if (account) {
        token.accessToken = account.access_token
        token.id = profile?.id
      }

      if (isNewUser) {
        const sendResponse = await sendEmail({
          subject: 'Bienvenue chez Matchi',
          receivers: [profile?.email as string],
          template: EmailTemplateWelcome({
            firstName: profile?.name as string,
          }),
        })
        if (sendResponse.rejected) console.log(sendResponse.response)
      }

      return token
    },
  },
  providers: [
    Google,
    facebook,
    Credentials({
      name: 'Credentials',
      async authorize({ username, password }) {
        try {
          const res = await loginUser({
            email: username as string,
            password: password as string,
          })

          // user not found
          if (res.message) return null

          // return user
          return res.body as User
        } catch (error: unknown) {
          return null
        }
      },
    }),
  ],
  pages: {
    signIn: ROUTES.HOME,
    signOut: ROUTES.HOME,
    error: ROUTES.HOME,
    newUser: ROUTES.MEMBER.COMPLETE_PROFILE,
  },
})
