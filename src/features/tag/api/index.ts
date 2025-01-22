import { api } from '@app/api'
import { Tag } from '@entities/tag/model'

export const tagApi = {
  fetchTags: async () => {
    return await api.get<Tag[]>('/posts/tags')
  },
}
