import { ROUTES } from '@/routes'
import { LoginUser } from '@/services/public'
import { PrismaAdapter } from '@auth/prisma-adapter'

import NextAuth, { User } from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import facebook from 'next-auth/providers/facebook'
import Google from 'next-auth/providers/google'

import prisma from './prisma'

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  session: { strategy: 'jwt', maxAge: 24 * 60 * 60 },
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async session({ session, user }) {
      session.user = user
      return session
    },
    async jwt({ token, user, account, profile, isNewUser }) {
      if (user) token.user = user
      if (account) token.account = account
      if (profile) token.profile = profile
      return token
    },
  },
  providers: [
    Google,
    facebook,
    Credentials({
      name: 'Credentials',
      async authorize({ username, password }) {
        console.log(username, password)
        try {
          const res = await LoginUser({
            email: username as string,
            password: password as string,
          })

          if (res.message) return null

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
