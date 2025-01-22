import { useCallback } from 'react'
import { useComments, commentStore } from '@features/comment/model'
import { postStore } from '@features/post/model'
import { EditForm, DialogLayout } from '@shared/ui'

export const AddCommentDialog = () => {
  const { selectedPost } = postStore()
  const { newComment, showAddCommentDialog, setNewComment, setShowAddCommentDialog } = commentStore()

  const { addComment } = useComments(selectedPost?.id ?? 0)

  const handleAddComment = useCallback(() => {
    addComment(newComment)
    setShowAddCommentDialog(false)
  }, [addComment, newComment, setShowAddCommentDialog])

  return (
    <DialogLayout title="새 댓글 추가" open={showAddCommentDialog} onOpenChange={setShowAddCommentDialog}>
      <EditForm
        value={newComment.body}
        placeholder="댓글 내용"
        submitText="댓글 추가"
        onChange={(e) => setNewComment({ ...newComment, body: e.target.value })}
        onSubmit={handleAddComment}
      />
    </DialogLayout>
  )
}
