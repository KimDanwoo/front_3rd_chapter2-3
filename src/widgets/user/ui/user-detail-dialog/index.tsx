import { DialogLayout } from '@shared/ui'
import { userStore } from '@features/user/model'
import { UserCard } from '@entities/user/ui'

export const UserDetailDialog = () => {
  const { selectedUser, showUserModal, setShowUserModal } = userStore()

  return (
    <DialogLayout title="사용자 정보" open={showUserModal} onOpenChange={setShowUserModal}>
      <UserCard user={selectedUser} />
    </DialogLayout>
  )
}
