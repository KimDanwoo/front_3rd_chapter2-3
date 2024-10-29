import { commentsApi } from '@features/comments/api'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { Comment } from '@entities/model/types' // 타입 임포트 추가 필요

// Query Keys 중앙 관리
export const commentsKeys = {
  all: ['comments'] as const,
  lists: () => [...commentsKeys.all, 'list'] as const,
  list: (postId: number) => [...commentsKeys.lists(), postId] as const,
  detail: (commentId: number) => [...commentsKeys.all, 'detail', commentId] as const,
}

export const useComments = (postId: number) => {
  return useQuery({
    queryKey: commentsKeys.list(postId),
    queryFn: () => commentsApi.getComments(postId),
    enabled: !!postId,
  })
}

export const useCreateComment = (postId: number) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: commentsApi.createComment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: commentsKeys.list(postId) })
    },
  })
}

export const useUpdateComment = (postId: number) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, body }: { id: number; body: string }) => commentsApi.updateComment(id, body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: commentsKeys.list(postId) })
    },
  })
}

export const useDeleteComment = (postId: number) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: commentsApi.deleteComment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: commentsKeys.list(postId) })
    },
  })
}

// 댓글 좋아요 Hook
export const useLikeComment = (postId: number) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, likes }: { id: number; likes: number }) => commentsApi.likeComment(id, likes),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: commentsKeys.list(postId) })
    },
  })
}

// 편의를 위한 통합 Hook (기존 방식과 호환)
export const useCommentsQuery = (postId: number) => {
  const commentsQuery = useComments(postId)
  const createCommentMutation = useCreateComment(postId)
  const updateCommentMutation = useUpdateComment(postId)
  const deleteCommentMutation = useDeleteComment(postId)
  const likeCommentMutation = useLikeComment(postId)

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
