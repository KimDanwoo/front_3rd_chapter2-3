import { PostAction, PostState } from '@entities/post/model'
import { create } from 'zustand'

export const postStore = create<PostState & PostAction>((set) => ({
  newPost: { title: '', body: '', userId: 1 },
  selectedPost: null,
  showAddDialog: false,
  showEditDialog: false,
  showPostDetailDialog: false,
  setNewPost: (newPost) => set({ newPost }),

  setSelectedPost: (selectedPost) => set({ selectedPost }),
  setShowAddDialog: (showAddDialog) => set({ showAddDialog }),
  setShowEditDialog: (showEditDialog) => set({ showEditDialog }),
  setShowPostDetailDialog: (showPostDetailDialog) => set({ showPostDetailDialog }),
}))
