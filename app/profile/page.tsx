'use client';

import React from 'react';
import { useAuth } from '@/hooks/use-auth';
import { useUserProfile } from '@/hooks/use-user-profile';
import { UserProfileForm } from '@/components/forms/profile/user-form';
import useUser from '@/hooks/use-user';
import { Wallet, CreditCard } from 'lucide-react';
import { formatCreditValue } from '@/lib/utils';

export default function ProfilePage() {
  const { user, loading: authLoading } = useAuth();
  const { user: clientUser } = useUser();

  const preCreditAvailable = clientUser?.data?.preWallet?.credit ?? 0;
  const creditAvailable = clientUser?.data?.wallet?.credit ?? 0;

  const uid = user?.uid;
  const { data: userProfile, isLoading: profileLoading, error } = useUserProfile(uid);

  if (authLoading || profileLoading) {
    return <p>Cargando...</p>;
  }

  if (!user) {
    return <p>No hay un usuario autenticado.</p>;
  }

  if (error) {
    return <p>Hubo un error al cargar el perfil.</p>;
  }

  const initialData = {
    fullName: userProfile?.invoiceData?.fullname || user?.displayName || '',
    idDocument: userProfile?.invoiceData?.dni || '',
    phoneNumber: userProfile?.invoiceData?.phone || user?.phoneNumber || '',
    email: userProfile?.email || user?.email || '',
    password: '********',
    validatedDni: userProfile?.validatedDni || false,
    validatedPhone: userProfile?.validatedPhone || false,
    validatedEmail: userProfile?.validatedEmail || false,
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="text-center text-3xl font-extrabold text-gray-900">Perfil del Usuario</h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Actualiza tus datos personales y preferencias de seguridad.
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-6 shadow-sm rounded-lg sm:px-10 mb-6">
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
              <div className="flex items-center mb-2">
                <Wallet className="text-blue-500 mr-2" size={20} />
                <h3 className="text-lg font-medium text-gray-900">Billetera Adán</h3>
              </div>
              <p className="text-sm text-gray-600 mb-1">Crédito disponible:</p>
              <p className="text-2xl font-bold text-blue-600">
                {formatCreditValue(creditAvailable)}
              </p>
            </div>
            <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
              <div className="flex items-center mb-2">
                <CreditCard className="text-green-500 mr-2" size={20} />
                <h3 className="text-lg font-medium text-gray-900">Billetera REI</h3>
              </div>
              <p className="text-sm text-gray-600 mb-1">Crédito disponible:</p>
              <p className="text-2xl font-bold text-green-600">
                {formatCreditValue(preCreditAvailable)}
              </p>
            </div>
          </div>
          <UserProfileForm initialData={initialData} />
        </div>
      </div>
    </div>
  );
}
