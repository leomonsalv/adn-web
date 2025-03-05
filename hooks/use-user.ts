'use client';

import { useQuery } from '@tanstack/react-query';
import { getUserById, getUserByEmail, getUserAddresses } from '@/api/users';
import { useAuth } from './use-auth';

export default function useUser() {
  const { user, accessToken } = useAuth();

  const isAnonymous = user?.isAnonymous;

  const query = useQuery({
    queryKey: ['firebaseUser', user?.uid],
    queryFn: () => getUserById(user?.uid!),
    enabled: !!user?.uid && !isAnonymous,
  });

  const queryAddresses = useQuery({
    queryKey: ['firebaseUserAddresses'],
    queryFn: () => getUserAddresses(user?.uid!),
    enabled: !!user?.uid && !isAnonymous,
  });

  const useGetUserByEmail = (email: string) => {
    return useQuery({
      queryKey: ['firebaseUser', email],
      queryFn: () => getUserByEmail(email),
      enabled: !!email && !isAnonymous,
    });
  };

  return {
    ...query,
    user: {
      ...query.data,
      id: query.data?.id,
      accessToken,
    },
    addresses: queryAddresses.data,
    useGetUserByEmail,
  };
}
