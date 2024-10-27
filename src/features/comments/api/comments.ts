import { Comment } from '@entities/model/types'
import { api } from '@app/api'

export const commentsApi = {
  getComments: async (postId: number) => {
    const response = await api.get<{ comments: Comment[] }>(`/comments/post/${postId}`)
    return response
  },

  createComment: async (comment: Omit<Comment, 'id'>) => {
    const response = await api.post<Comment>('/comments/add', comment)
    return response
  },

  updateComment: async ({ id, body }: { id: number; body: string }) => {
    const response = await api.put<Comment>(`/comments/${id}`, { body })
    return response
  },

  deleteComment: async (id: number) => {
    await api.delete(`/comments/${id}`)
    return id
  },

  likeComment: async ({ id, likes }: { id: number; likes: number }) => {
    const response = await api.patch<Comment>(`/comments/${id}`, { likes })
    return response
  },
}
