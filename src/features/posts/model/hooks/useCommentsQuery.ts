import { commentsApi } from '@features/posts/api'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

export const useCommentsQuery = (postId: number) => {
  const queryClient = useQueryClient()

  const commentsQuery = useQuery({
    queryKey: ['comments', postId],
    queryFn: () => commentsApi.getComments(postId),
    enabled: !!postId,
  })

  const createCommentMutation = useMutation({
    mutationFn: commentsApi.createComment,
    onSuccess: () => {
      queryClient.invalidateQueries(['comments', postId])
    },
  })

  const updateCommentMutation = useMutation({
    mutationFn: ({ id, body }: { id: number; body: string }) => commentsApi.updateComment(id, body),
    onSuccess: () => {
      queryClient.invalidateQueries(['comments', postId])
    },
  })

  const deleteCommentMutation = useMutation({
    mutationFn: commentsApi.deleteComment,
    onSuccess: () => {
      queryClient.invalidateQueries(['comments', postId])
    },
  })

  const likeCommentMutation = useMutation({
    mutationFn: ({ id, likes }: { id: number; likes: number }) => commentsApi.likeComment(id, likes),
    onSuccess: () => {
      queryClient.invalidateQueries(['comments', postId])
    },
  })

  return {
    comments: commentsQuery.data || [],
    isLoading: commentsQuery.isLoading,
    isError: commentsQuery.isError,
    createComment: createCommentMutation.mutate,
    updateComment: updateCommentMutation.mutate,
    deleteComment: deleteCommentMutation.mutate,
    likeComment: likeCommentMutation.mutate,
  }
}
