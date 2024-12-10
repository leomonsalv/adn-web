import { deleteAccount } from '@/api/auth'
import { auth } from '@/lib/firebaseConfig'
import { useMutation } from '@tanstack/react-query'

export default function useAuth() {
  const useDeleteAccountMutation = () => {
    const user = auth.currentUser
    const mutation = useMutation({
      mutationKey: ['delete-account'],
      mutationFn: () => {
        if (!user) throw new Error('User not found')
        return deleteAccount(user)
      },
    })
    return mutation
  }

  return { useDeleteAccountMutation }
}
