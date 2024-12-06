import { UserProfileForm } from "@/components/forms/profile/user-form";
import React from "react";

//TODO: REPLACE THIS WITH GET USER FROM FIREBASE
const mockUserData = {
  fullName: "John Doe",
  idDocument: "123456789",
  phoneNumber: "1234567890",
  email: "john.doe@example.com",
  password: "********",
};

export default function ProfilePage() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="text-center text-3xl font-extrabold text-gray-900">
          Perfil del Usuario
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Actualiza tus datos personales y preferencias de seguridad.
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-6 shadow rounded-lg sm:px-10">
          <UserProfileForm initialData={mockUserData} />
        </div>
      </div>
    </div>
  );
}
