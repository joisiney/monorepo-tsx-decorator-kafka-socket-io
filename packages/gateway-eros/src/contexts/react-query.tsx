import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { FC, ReactElement } from 'react'
import { api } from '../services/client-http'

const MINUTE = 1000 * 60

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      gcTime: 10 * MINUTE,
    },
  },
})
export const ContextReactQuery: FC<{
  children: ReactElement
  baseUrl?: string
}> = ({ children, baseUrl }) => {
  api.boot(baseUrl)
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  )
}
