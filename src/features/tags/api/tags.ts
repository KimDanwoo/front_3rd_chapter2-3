import { api } from '@app/api'

export const tagsApi = {
  getTags: async () => {
    return await api.get<string[]>('/posts/tags')
  },
}
