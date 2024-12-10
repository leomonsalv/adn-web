import { User } from 'firebase/auth'
import { httpsCallable } from 'firebase/functions'
import { functions } from '@/lib/firebaseConfig'

export const deleteAccount = async (user: User) => {
  try {
    const response = await httpsCallable(functions, 'users-deleteUser')()
    return response.data
  } catch (error) {
    console.error('Error deleting account:', error)
    throw error
  }
}
