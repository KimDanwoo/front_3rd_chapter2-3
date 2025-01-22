import { api } from '@app/api'
import { User } from '@entities/user/model'

export interface UsersResponse {
  users: User[]
}

export const userApi = {
  fetchUsers: (limit: number, select: string) => {
    return api.get<UsersResponse>(`/users?limit=${limit}&select=${select}`)
  },

  fetchUser: (id: number) => api.get<User>(`/users/${id}`),
}
