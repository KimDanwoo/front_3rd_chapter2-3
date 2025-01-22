import { commentApi } from '@features/comment/api'
import { useQuery } from '@tanstack/react-query'
import { Comment } from '@entities/comment/model'
import { DEFAULT_STALE_TIME } from '@shared/model'

export function useCommentsQuery(postId: number) {
  return useQuery<Comment[], Error>({
    queryKey: ['comments', postId],
    queryFn: async () => {
      const { comments } = await commentApi.fetchComments(postId)
      return comments
    },
    staleTime: DEFAULT_STALE_TIME,
    enabled: postId !== 0,
  })
}
