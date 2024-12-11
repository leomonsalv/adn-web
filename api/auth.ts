import { User } from 'firebase/auth'
import { httpsCallable } from 'firebase/functions'
import { functions } from '@/lib/firebaseConfig'
import { USERDELETE } from '@/lib/urls'

export const deleteAccount = async (user: User) => {
  try {
    const response = await httpsCallable(functions, USERDELETE)()
    return response.data
  } catch (error) {
    console.error('Error deleting account:', error)
    throw error
  }
}
