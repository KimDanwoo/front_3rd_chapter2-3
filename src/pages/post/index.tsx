import { AddCommentDialog, UpdateCommentDialog } from '@widgets/comment/ui'
import { AddPostDialog, DetailPostDialog, PostSection, UpdatePostDialog } from '@widgets/post/ui'
import { Card } from '@shared/ui'
import { PostCardHeader } from '@features/post/ui'
import { UserDetailDialog } from '@widgets/user/ui'
import { Footer, Header } from '@widgets/common'

export const PostPage = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <Card.Container className="w-full max-w-6xl mx-auto">
          <PostCardHeader />

          <PostSection />

          <AddCommentDialog />
          <AddPostDialog />
          <DetailPostDialog />
          <UpdateCommentDialog />
          <UpdatePostDialog />
          <UserDetailDialog />
        </Card.Container>
      </main>

      <Footer />
    </div>
  )
}
