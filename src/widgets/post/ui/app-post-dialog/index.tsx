import { DialogLayout } from '@shared/ui'
import { postStore } from '@features/post/model'
import { AddPostForm } from '@features/post/ui'

export const AddPostDialog = () => {
  const { showAddDialog, setShowAddDialog } = postStore()

  return (
    <DialogLayout title="새 게시물 추가" open={showAddDialog} onOpenChange={setShowAddDialog}>
      <AddPostForm />
    </DialogLayout>
  )
}
