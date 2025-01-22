import { DialogLayout } from '@shared/ui'
import { postStore } from '@features/post/model'
import { UpdatePostForm } from '@features/post/ui'

export const UpdatePostDialog = () => {
  const { showEditDialog, setShowEditDialog } = postStore()

  return (
    <DialogLayout title="게시물 수정" open={showEditDialog} onOpenChange={setShowEditDialog}>
      <UpdatePostForm />
    </DialogLayout>
  )
}
