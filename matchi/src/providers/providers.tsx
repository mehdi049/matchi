import { getServerSession } from 'next-auth'
import { NextUIDesignProvider } from './nextUIDesignProvider'
import NextAuthProvider from './nextAuthProvider'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'

export async function Providers({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(authOptions)

  return (
    <NextAuthProvider session={session}>
      <NextUIDesignProvider>{children}</NextUIDesignProvider>
    </NextAuthProvider>
  )
}
