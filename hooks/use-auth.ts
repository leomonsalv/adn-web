'use client';

import { useContext, useEffect } from 'react';
import { AuthContext } from '@/providers/auth-provider';
import { auth } from '@/lib/firebaseConfig';
import { useMutation } from '@tanstack/react-query';
import { deleteAccount } from '@/api/auth';
import { updateProfile } from 'firebase/auth';

/**
 * Hook para obtener el usuario autenticado desde el UserContext.
 * - user: el usuario de Firebase o null si no está autenticado.
 * - loading: boolean que indica si aún se está determinando el estado.
 */
export function useAuth() {
  const context = useContext(AuthContext);

  // Set default displayName for users without one
  useEffect(() => {
    const user = auth.currentUser;
    if (user && !user.displayName) {
      const defaultName = `${user.email?.split('@')[0]}`;
      updateProfile(user, { displayName: defaultName }).catch((error) => {
        console.error('Error updating display name:', error);
      });
    }
  }, [context?.user]);

  const useDeleteAccountMutation = () => {
    const user = auth.currentUser;
    const mutation = useMutation({
      mutationKey: ['delete-account'],
      mutationFn: () => {
        if (!user) throw new Error('User not found');
        return deleteAccount(user);
      },
    });
    return mutation;
  };

  if (context === undefined) {
    throw new Error('useAuth must be used within a AuthProvider');
  }

  return { ...context, useDeleteAccountMutation };
}
