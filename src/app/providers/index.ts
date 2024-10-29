// contexts/PostsContext.tsx
import { createContext, useContext, useState, useCallback } from 'react'
import { useQueryParams } from '@shared/lib/hooks'
import { usePosts } from '@features/posts/model/hooks/usePosts'

interface PostsContextType {
  // States
  posts: any[]
  isLoading: boolean
  filters: {
    searchQuery: string
    sortBy: string
    sortOrder: string
    selectedTag: string
  }
  pagination: {
    skip: number
    limit: number
    total: number
  }
  dialogs: {
    showAddDialog: boolean
    showEditDialog: boolean
    showPostDetailDialog: boolean
    selectedPost: any | null
  }
  // Actions
  setFilters: (filters: Partial<PostsContextType['filters']>) => void
  setPagination: (pagination: Partial<PostsContextType['pagination']>) => void
  handlePostAction: (action: string, post: any) => void
  openAddDialog: () => void
  closeAddDialog: () => void
  // ... other actions
}

const PostsContext = createContext<PostsContextType | null>(null)

export const PostsProvider = ({ children }) => {
  const {
    skip,
    limit,
    searchQuery,
    sortBy,
    sortOrder,
    selectedTag,
    setSkip,
    setLimit,
    setSearchQuery,
    setSortBy,
    setSortOrder,
    setSelectedTag,
  } = useQueryParams()

  const {
    posts,
    total,
    isLoading,
    addPost,
    updatePost,
    deletePost,
  } = usePosts({ skip, limit, searchQuery, selectedTag })

  const [dialogs, setDialogs] = useState({
    showAddDialog: false,
    showEditDialog: false,
    showPostDetailDialog: false,
    selectedPost: null,
  })

  const handlePostAction = useCallback((action, post) => {
    switch(action) {
      case 'edit':
        setDialogs(prev => ({
          ...prev,
          showEditDialog: true,
          selectedPost: post
        }))
        break
      case 'delete':
        deletePost(post.id)
        break
    }
  }, [deletePost])

  const value = {
    // States
    posts,
    isLoading,
    filters: {
      searchQuery,
      sortBy,
      sortOrder,
      selectedTag
    },
    pagination: {
      skip,
      limit,
      total
    },
    dialogs,
    // Actions
    setFilters: useCallback((newFilters) => {
      setSearchQuery(newFilters.searchQuery ?? searchQuery)
      setSortBy(newFilters.sortBy ?? sortBy)
      setSortOrder(newFilters.sortOrder ?? sortOrder)
      setSelectedTag(newFilters.selectedTag ?? selectedTag)
    }, []),
    setPagination: useCallback((newPagination) => {
      setSkip(newPagination.skip ?? skip)
      setLimit(newPagination.limit ?? limit)
    }, []),
    handlePostAction,
    openAddDialog: () => setDialogs(prev => ({ ...prev, showAddDialog: true })),
    closeAddDialog: () => setDialogs(prev => ({ ...prev, showAddDialog: false })),
    // ... other actions
  }

  return <PostsContext.Provider value={value}>{children}</PostsContext.Provider>
}

export const usePosts = () => {
  const context = useContext(PostsContext)
  if (!context) {
    throw new Error('usePosts must be used within a PostsProvider')
  }
  return context
}


