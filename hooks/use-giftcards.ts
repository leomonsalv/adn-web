'use client';

import {
  getGiftcardsList,
  getUserGiftcards,
  createGiftcard,
  redeemGiftcard,
  validateGiftcard,
} from '@/api/giftcards';
import {
  GiftcardCreateRequest,
  GiftcardRedeemRequest,
  GiftcardValidateRequest,
} from '@/types/giftcard';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useAuth } from './use-auth';

export default function useGiftcards() {
  const queryClient = useQueryClient();
  const { user, accessToken } = useAuth();

  // Obtener lista de giftcards para administración
  const useGetGiftcardsList = () => {
    return useQuery({
      queryKey: ['giftcards', 'admin'],
      queryFn: async () => getGiftcardsList(),
      enabled: !!accessToken,
    });
  };

  // Obtener lista de giftcards del usuario autenticado
  const useGetUserGiftcards = () => {
    return useQuery({
      queryKey: ['giftcards', 'user', user?.uid],
      queryFn: async () => {
        if (!accessToken) {
          throw new Error('No access token available');
        }
        return getUserGiftcards(accessToken);
      },
      enabled: !!user?.uid && !!accessToken && !user?.isAnonymous,
    });
  };

  // Crear una nueva giftcard (machine to machine)
  const useCreateGiftcard = () => {
    return useMutation({
      mutationFn: async (data: GiftcardCreateRequest) => {
        if (!accessToken) {
          throw new Error('No access token available');
        }
        return createGiftcard(data, accessToken);
      },
      onSuccess: () => {
        // Invalidar consultas relacionadas para actualizar los datos
        queryClient.invalidateQueries({ queryKey: ['giftcards'] });
      },
    });
  };

  // Canjear una giftcard
  const useRedeemGiftcard = () => {
    return useMutation({
      mutationFn: async (data: GiftcardRedeemRequest) => {
        if (!accessToken) {
          throw new Error('No access token available');
        }
        return redeemGiftcard(data, accessToken);
      },
      onSuccess: () => {
        // Invalidar consultas relacionadas para actualizar los datos
        queryClient.invalidateQueries({ queryKey: ['giftcards', 'user', user?.uid] });
      },
    });
  };

  // Validar una giftcard sin canjearla
  const useValidateGiftcard = () => {
    return useMutation({
      mutationFn: async (data: GiftcardValidateRequest) => {
        return validateGiftcard(data);
      },
    });
  };

  return {
    useGetGiftcardsList,
    useGetUserGiftcards,
    useCreateGiftcard,
    useRedeemGiftcard,
    useValidateGiftcard,
  };
}
