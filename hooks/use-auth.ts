'use client';

import { useContext } from 'react';
import { AuthContext } from '@/providers/auth-provider';
import { auth } from '@/lib/firebaseConfig';
import { useMutation } from '@tanstack/react-query';
import { deleteAccount } from '@/api/auth';

/**
 * Hook para obtener el usuario autenticado desde el UserContext.
 * - user: el usuario de Firebase o null si no está autenticado.
 * - loading: boolean que indica si aún se está determinando el estado.
 */
export function useAuth() {
  const context = useContext(AuthContext);

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

{
  /* 
  'use client';

import { useMutation } from '@tanstack/react-query';
import { deleteAccount } from '@/api/auth';
import { useAuth } from '@/providers/auth-provider';
import { auth } from '@/lib/firebaseConfig';

export function useAuthExtended() {
  const authContext = useAuth();
  
  const useDeleteAccountMutation = () => {
    const mutation = useMutation({
      mutationKey: ['delete-account'],
      mutationFn: () => {
        if (!authContext.user) throw new Error('User not found');
        return deleteAccount(authContext.user);
      },
    });
    return mutation;
  };

  return {
    ...authContext,
    useDeleteAccountMutation
  };
}
  */
}
