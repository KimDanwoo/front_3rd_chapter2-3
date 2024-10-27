import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { postsApi } from '@features/posts/api/posts'
import { Post } from '@entities/model/types'

export const postsKeys = {
  all: ['posts'] as const,
  lists: () => [...postsKeys.all, 'list'] as const,
  list: (filters: { limit: number; skip: number }) => [...postsKeys.lists(), filters] as const,
  tags: () => [...postsKeys.all, 'tags'] as const,
  byTag: (tag: string) => [...postsKeys.all, 'tag', tag] as const,
  search: (query: string) => [...postsKeys.all, 'search', query] as const,
}

export function usePosts({ limit, skip, searchQuery, tag }: UsePostsParams) {
  return useQuery({
    queryKey: ['posts', { limit, skip, searchQuery, tag }],
    queryFn: async () => {
      console.log('usePosts queryFn', { limit, skip, searchQuery, tag })
      // 태그로 검색하는 경우
      if (!searchQuery && tag) {
        return await postsApi.fetchPostsByTag(tag)
      }

      // 검색어가 있는 경우
      if (searchQuery) {
        return await postsApi.searchPosts(searchQuery)
      }

      // 기본 게시물 목록
      return await postsApi.fetchPosts({ limit, skip })
    },
  })
}

export const useTags = () => {
  return useQuery({
    queryKey: postsKeys.tags(),
    queryFn: postsApi.getTags,
  })
}

export const useCreatePost = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (newPost: Omit<Post, 'id'>) => postsApi.createPost(newPost),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: postsKeys.lists() })
    },
  })
}

export const useUpdatePost = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (post: Post) => postsApi.updatePost(post),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: postsKeys.lists() })
    },
  })
}

export const useDeletePost = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: number) => postsApi.deletePost(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: postsKeys.lists() })
    },
  })
}
