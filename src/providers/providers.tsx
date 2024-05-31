import { auth } from '@/lib/auth'
import NextAuthProvider from './nextAuthProvider'
import { NextUIDesignProvider } from './nextUIDesignProvider'
import QueryProvider from './queryClientProvider'

export async function Providers({ children }: { children: React.ReactNode }) {
  const session = await auth()

  return (
    <QueryProvider>
      <NextAuthProvider session={session}>
        <NextUIDesignProvider>{children}</NextUIDesignProvider>
      </NextAuthProvider>
    </QueryProvider>
  )
}
