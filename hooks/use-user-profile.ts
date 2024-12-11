'use client'

import { useQuery } from '@tanstack/react-query'
import { doc, getDoc } from 'firebase/firestore'
import { db } from '@/lib/firebaseConfig'
import { UserProfileData } from '@/types/userProfile'

/**
 * Hook para obtener el perfil del usuario desde Firestore.
 * Requiere un uid. Devuelve { data: UserProfileData | undefined, isLoading, error }.
 */
async function fetchUserProfile(uid: string): Promise<UserProfileData> {
  const docRef = doc(db, 'users', uid)
  const docSnap = await getDoc(docRef)

  if (!docSnap.exists()) {
    throw new Error('No se encontró información de perfil para este usuario.')
  }

  // Ajusta este casting a la estructura real de tu documento
  return docSnap.data() as UserProfileData
}

export function useUserProfile(uid?: string) {
  const { data, isLoading, error } = useQuery({
    queryKey: ['userProfile', uid],
    queryFn: () => {
      if (!uid) throw new Error('UID no proporcionado.')
      return fetchUserProfile(uid)
    },
    enabled: !!uid,
  })

  return { data, isLoading, error }
}
