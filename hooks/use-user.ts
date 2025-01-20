'use client';

import { useQuery } from '@tanstack/react-query';
import { getUserById, getUserByEmail } from '@/api/users';
import { useAuth } from './use-auth';

export function useFirebaseUser() {
  const { user } = useAuth();

  const {
    data: firebaseUser,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['firebaseUser', user?.uid],
    queryFn: () => getUserById(user?.uid!),
    enabled: !!user?.uid,
  });

  const getUserByEmailQuery = (email: string) => {
    return useQuery({
      queryKey: ['firebaseUser', email],
      queryFn: () => getUserByEmail(email),
      enabled: !!email,
    });
  };

  return {
    firebaseUser: firebaseUser?.data,
    userId: firebaseUser?.id,
    isLoading,
    error,
    getUserByEmail: getUserByEmailQuery,
  };
}
