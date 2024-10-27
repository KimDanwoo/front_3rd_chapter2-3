import { Post, User } from '@entities/model/types'
import { api } from '@app/api'

export interface PostsResponse {
  posts: Post[]
  total: number
  skip: number
  users: User[]
}

export const postsApi = {
  fetchPosts: async ({ limit, skip }: { limit: number; skip: number }) => {
    return await api.get<PostsResponse>(`/posts?limit=${limit}&skip=${skip}`)
  },

  fetchPostsByTag: async (tag: string) => {
    return await api.get<PostsResponse>(`/posts/tag/${tag}`)
  },

  searchPosts: async (query: string) => {
    return await api.get<PostsResponse>(`/posts/search?q=${query}`)
  },

  createPost: async (post: Omit<Post, 'id'>) => {
    return await api.post<Post>('/posts/add', post)
  },

  updatePost: async (post: Post) => {
    return await api.put<Post>(`/posts/${post.id}`, post)
  },

  deletePost: async (id: number) => {
    await api.delete(`/posts/${id}`)
    return id
  },

  getTags: async () => {
    return await api.get<string[]>('/posts/tags')
  },
}
