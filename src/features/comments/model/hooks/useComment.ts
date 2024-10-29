import { useState } from 'react'
import { Comment } from '@entities/model/types'

interface CommentState {
  body: string
  postId: number | null
  userId: number
}

interface CommentsMap {
  [key: number]: Comment[]
}

export const useComment = () => {
  const [newComment, setNewComment] = useState<CommentState>({ body: '', postId: null, userId: 1 })
  const [comments, setComments] = useState<CommentsMap>({})
  const [selectedComment, setSelectedComment] = useState<Comment | null>(null)
  const [showAddCommentDialog, setShowAddCommentDialog] = useState(false)
  const [showEditCommentDialog, setShowEditCommentDialog] = useState(false)

  // 댓글 추가
  const addComment = async () => {
    if (!newComment.postId) return

    try {
      const response = await fetch('/api/comments/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newComment),
      })
      const data = await response.json() as Comment
      setComments((prev) => ({
        ...prev,
        [data.postId]: [...(prev[data.postId] || []), data],
      }))
      setShowAddCommentDialog(false)
      setNewComment({ body: '', postId: null, userId: 1 })
    } catch (error) {
      console.error('댓글 추가 오류:', error)
    }
  }

  // 댓글 업데이트 
  const updateComment = async () => {
    if (!selectedComment) return

    try {
      const response = await fetch(`/api/comments/${selectedComment.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ body: selectedComment.body }),
      })
      const data = await response.json() as Comment
      setComments((prev) => ({
        ...prev,
        [data.postId]: prev[data.postId].map((comment) => 
          comment.id === data.id ? data : comment
        ),
      }))
      setShowEditCommentDialog(false)
    } catch (error) {
      console.error('댓글 업데이트 오류:', error)
    }
  }

  // 댓글 삭제
  const deleteComment = async (id: number, postId: number) => {
    try {
      await fetch(`/api/comments/${id}`, {
        method: 'DELETE',
      })
      setComments((prev) => ({
        ...prev,
        [postId]: prev[postId].filter((comment) => comment.id !== id),
      }))
    } catch (error) {
      console.error('댓글 삭제 오류:', error)
    }
  }

  // 댓글 좋아요
  const likeComment = async (id: number, postId: number) => {
    try {
      const comment = comments[postId]?.find((c) => c.id === id)
      if (!comment) return

      const response = await fetch(`/api/comments/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ likes: comment.likes + 1 }),
      })
      const data = await response.json() as Comment
      setComments((prev) => ({
        ...prev,
        [postId]: prev[postId].map((comment) => 
          comment.id === data.id ? data : comment
        ),
      }))
    } catch (error) {
      console.error('댓글 좋아요 오류:', error)
    }
  }

  return {
    newComment,
    comments,
    selectedComment,
    showAddCommentDialog,
    showEditCommentDialog,
    setNewComment,
    setComments,
    setSelectedComment,
    setShowAddCommentDialog,
    setShowEditCommentDialog,
    addComment,
    updateComment,
    deleteComment,
    likeComment,
  }
}
