import { api } from '@app/api'
import type { User } from '@entities/model/types'

export interface UsersResponse {
  users: User[]
}

export const userApi = {
  getAll: (limit: number, select: string) => {
    const queryParams = new URLSearchParams()
    // if (limit) queryParams.set('limit', limit.toString())
    // if (select) queryParams.set('select', select)
    return api.get<UsersResponse>(`/users?limit=${limit}&select=${select}`)
  },

  getById: (id: number) => api.get<User>(`/users/${id}`),
}
