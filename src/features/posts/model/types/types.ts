import { User } from '@entities/model/types'

export interface Post {
  id: number
  title: string
  body: string
  userId: number
  tags: string[]
  reactions: {
    likes: number
    dislikes: number
  }
  author?: User
}

export type PostCreate = Omit<Post, 'id' | 'reactions' | 'author'>
export type PostUpdate = Partial<PostCreate>
