import { User } from 'firebase/auth'
import { httpsCallable } from 'firebase/functions'
import { db, functions } from '@/lib/firebaseConfig'
import { USERDELETE } from '@/lib/urls'
import { PartialUserProfileUpdateSchema } from '@/schemas/user-form'
import { auth } from '@/lib/firebaseConfig'
import { updateProfile } from 'firebase/auth'
import { doc, updateDoc } from 'firebase/firestore'

export const deleteAccount = async (user: User) => {
  try {
    const response = await httpsCallable(functions, USERDELETE)()
    return response.data
  } catch (error) {
    console.error('Error deleting account:', error)
    throw error
  }
}

export async function updateUserProfile(data: { [key: string]: any }) {
  const validatedFields = PartialUserProfileUpdateSchema.safeParse(data)

  if (!validatedFields.success) {
    return {
      success: false,
      errors: validatedFields.error.flatten().fieldErrors,
    }
  }

  const user = auth.currentUser
  if (!user) {
    return { success: false, errorCode: 'user-not-authenticated' }
  }

  const { fullName, idDocument } = validatedFields.data

  try {
    if (fullName) {
      const docRef = doc(db, 'users', user.uid)
      await updateProfile(user, { displayName: fullName })
      await updateDoc(docRef, { 'invoiceData.fullname': fullName })
    }

    if (idDocument) {
      const docRef = doc(db, 'users', user.uid)
      await updateDoc(docRef, { 'invoiceData.dni': idDocument })
    }

    return { success: true }
  } catch (error: any) {
    return {
      success: false,
      errorCode: error.code,
      errorMessage: error.message,
    }
  }
}
