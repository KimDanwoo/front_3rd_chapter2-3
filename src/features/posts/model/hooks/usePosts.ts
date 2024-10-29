import { useState } from 'react'
import { Post } from '@entities/model/types'

export interface PostsState {
  newPost: Omit<Post, 'id'>
  selectedPost: Post | null
  showEditDialog: boolean
  showAddDialog: boolean
  showPostDetailDialog: boolean

  setSelectedPost: (post: Post | null) => void
  setShowAddDialog: (open: boolean) => void
  setShowEditDialog: (open: boolean) => void
  setNewPost: (post: Omit<Post, 'id'>) => void
  setShowPostDetailDialog: (open: boolean) => void

  openPostDetail: (post: Post) => void
}

export const usePosts = () => {
  const [newPost, setNewPost] = useState<Omit<Post, 'id'>>({
    title: '',
    body: '',
    userId: 1,
    tags: [],
    reactions: { likes: 0, dislikes: 0 },
  })

  const [selectedPost, setSelectedPost] = useState<Post | null>(null)
  const [showEditDialog, setShowEditDialog] = useState(false)
  const [showAddDialog, setShowAddDialog] = useState(false)
  const [showPostDetailDialog, setShowPostDetailDialog] = useState(false)

  const openPostDetail = (post: Post) => {
    setSelectedPost(post)
    setShowPostDetailDialog(true)
  }

  return {
    selectedPost,
    showAddDialog,
    showEditDialog,
    newPost,
    showPostDetailDialog,

    setSelectedPost,
    setShowAddDialog,
    setShowEditDialog,
    setNewPost,
    setShowPostDetailDialog,

    openPostDetail,
  }
}
