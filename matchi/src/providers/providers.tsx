import { NextUIDesignProvider } from './nextUIDesignProvider'
import NextAuthProvider from './nextAuthProvider'
import { auth } from '@/lib/auth'

export async function Providers({ children }: { children: React.ReactNode }) {
  const session = await auth()

  return (
    <NextAuthProvider session={session}>
      <NextUIDesignProvider>{children}</NextUIDesignProvider>
    </NextAuthProvider>
  )
}
