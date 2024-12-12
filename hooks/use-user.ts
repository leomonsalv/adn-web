'use client'

import { useState, useEffect } from 'react'
import { onAuthStateChanged, User } from 'firebase/auth'
import { auth } from '@/lib/firebaseConfig'

/**
 * Hook para obtener el usuario autenticado desde Firebase Auth.
 * - user: el usuario de Firebase o null si no está autenticado.
 * - loading: boolean que indica si aún se está determinando el estado.
 * @return { user, loading }.
 */
export function useUser() {
  const [user, setUser] = useState<User | null>(auth.currentUser)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser)
      setLoading(false)
    })

    return () => unsubscribe()
  }, [])

  return { user, loading }
}
