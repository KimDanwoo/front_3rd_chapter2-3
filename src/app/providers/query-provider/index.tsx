import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { FC } from 'react'
import { ONE_MINUTE, FIVE_MINUTES } from '@shared/model'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: ONE_MINUTE,
      gcTime: FIVE_MINUTES,
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
})

interface QueryProviderProps {
  children: React.ReactNode
}

export const QueryProvider: FC<QueryProviderProps> = ({ children }) => {
  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
}
