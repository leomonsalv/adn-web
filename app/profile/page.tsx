'use client';

import React from 'react';
import { useUser } from '@/hooks/use-user';
import { useUserProfile } from '@/hooks/use-user-profile';
import { UserProfileForm } from '@/components/forms/profile/user-form';

export default function ProfilePage() {
  const { user, loading: authLoading } = useUser();
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
        <div className="bg-white py-8 px-6 shadow rounded-lg sm:px-10">
          <UserProfileForm initialData={initialData} />
        </div>
      </div>
    </div>
  );
}
