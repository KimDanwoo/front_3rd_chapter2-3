import { User } from '@entities/model/types'
import { useEffect, useState } from 'react'
import { useSelectedUser } from './useUserQuery'

export const useUser = () => {
  const [selectedUser, setSelectedUser] = useState<User | null>(null)
  const [showUserModal, setShowUserModal] = useState(false)

  const { data: userDetailData, refetch: fetchUserDetail } = useSelectedUser({ id: selectedUser?.id ?? 0 })

  useEffect(() => {
    if (selectedUser) {
      fetchUserDetail()
    }
  }, [selectedUser])

  const openUserModal = async (user: User) => {
    setSelectedUser(user)
    await fetchUserDetail()
    setShowUserModal(true)
  }

  return {
    selectedUser,
    userDetailData,
    setShowUserModal,
    showUserModal,
    openUserModal,
  }
}
