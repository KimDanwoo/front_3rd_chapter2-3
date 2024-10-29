import { useState } from 'react'
import { useFetchPosts, useCreatePost, useUpdatePost, useDeletePost } from './usePostsQuery'
import { useUsers } from '@features/user/model'
import { Post } from '@entities/model/types'

interface UsePostsParams {
  skip: number
  limit: number
  searchQuery: string
  selectedTag: string
}

export const usePosts = ({ skip, limit, searchQuery, selectedTag }: UsePostsParams) => {
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

  const { data: userData } = useUsers({
    limit: 0,
    select: 'username,image',
  })

  const { data: postsData, isLoading } = useFetchPosts({
    limit,
    skip,
    searchQuery,
    tag: selectedTag,
  })

  const createPostMutation = useCreatePost()
  const updatePostMutation = useUpdatePost()
  const deletePostMutation = useDeletePost()

  const addPost = async () => {
    try {
      await createPostMutation.mutateAsync(newPost)
      setShowAddDialog(false)
      setNewPost({ title: '', body: '', userId: 1, tags: [], reactions: { likes: 0, dislikes: 0 } })
    } catch (error) {
      console.error('게시물 추가 오류:', error)
      throw new Error('게시물을 추가하는데 실패했습니다')
    }
  }

  const updatePost = async () => {
    try {
      if (!selectedPost) throw new Error('선택된 게시물이 없습니다')
      await updatePostMutation.mutateAsync(selectedPost)
      setShowEditDialog(false)
    } catch (error) {
      console.error('게시물 업데이트 오류:', error)
      throw new Error('게시물을 업데이트하는데 실패했습니다')
    }
  }

  const deletePost = async (id: number) => {
    try {
      await deletePostMutation.mutateAsync(id)
    } catch (error) {
      console.error('게시물 삭제 오류:', error)
      throw new Error('게시물을 삭제하는데 실패했습니다')
    }
  }

  const openPostDetail = (post: Post) => {
    setSelectedPost(post)
    setShowPostDetailDialog(true)
  }

  const posts = postsData?.posts.map((post) => ({
    ...post,
    author: userData?.users.find((user) => user.id === post.userId),
  }))

  return {
    posts,
    total: postsData?.total,
    selectedPost,
    showAddDialog,
    showEditDialog,
    newPost,
    isLoading,
    showPostDetailDialog,

    setSelectedPost,
    setShowAddDialog,
    setShowEditDialog,
    setNewPost,
    setShowPostDetailDialog,

    addPost,
    updatePost,
    deletePost,
    openPostDetail,
  }
}
