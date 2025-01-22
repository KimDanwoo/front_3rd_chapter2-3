import { DialogLayout, HighlightText } from '@shared/ui'
import { filterStore, postStore } from '@features/post/model/stores'
import { CommentSection } from '@features/comment/ui'
import { PostSection } from '@features/post/ui'
export const DetailPostDialog = () => {
  const { selectedPost, showPostDetailDialog, setShowPostDetailDialog } = postStore()

  const { searchQuery } = filterStore()

  return (
    <DialogLayout
      open={showPostDetailDialog}
      onOpenChange={setShowPostDetailDialog}
      title={<HighlightText text={selectedPost?.title || ''} highlight={searchQuery} />}
    >
      <div>
        <PostSection />
        <CommentSection />
      </div>
    </DialogLayout>
  )
}
