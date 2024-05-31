'use client'

import { getQueryClient } from '@/lib/getQueryClient'
import { QueryClientProvider } from '@tanstack/react-query'
import React from 'react'

type providersProps = {
  children: React.ReactNode
}
export default function QueryProvider({ children }: providersProps) {
  const queryClient = getQueryClient()
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  )
}
