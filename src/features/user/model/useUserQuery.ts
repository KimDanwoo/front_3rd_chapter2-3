import { useQuery } from '@tanstack/react-query'
import { userApi } from '../api/user'

interface UseUsersParams {
  limit?: number
  select?: string
}

export function useUsers({ limit = 0, select = 'username,image' }: UseUsersParams) {
  return useQuery({
    queryKey: ['users'],
    queryFn: async () => {
      return await userApi.getAll(limit, select)
    },
  })
}
