"use client";

import React, { useActionState } from "react";
import { updateUserProfileAction } from "@/app/_actions/profile";
import { useToast } from "@/hooks/use-toast";
import {
  User2,
  UserCircle as Identification,
  PhoneCall,
  Mail,
  LockKeyhole,
  Edit,
  Check,
} from "lucide-react";
import { useFormStatus } from "react-dom";

interface UserProfileFormProps {
  initialData: {
    fullName: string;
    idDocument: string;
    phoneNumber?: string | null;
    email?: string | null;
    password: string;
  };
}

export function UserProfileForm({ initialData }: UserProfileFormProps) {
  const { toast } = useToast();

  return (
    <div className="space-y-6 bg-white p-6 rounded-lg shadow-md max-w-md mx-auto">
      <ProfileField
        id="fullName"
        label="Nombre completo"
        icon={<User2 className="text-gray-500" />}
        defaultValue={initialData.fullName}
        onSuccess={() =>
          toast({
            title: "Nombre actualizado",
            description: "Tu nombre se ha actualizado correctamente.",
          })
        }
      />
      <ProfileField
        id="idDocument"
        label="Documento de identidad"
        icon={<Identification className="text-gray-500" />}
        defaultValue={initialData.idDocument}
        onSuccess={() =>
          toast({
            title: "Documento actualizado",
            description:
              "Tu documento de identidad se ha actualizado correctamente.",
          })
        }
      />
      <ProfileField
        id="phoneNumber"
        label="Número de teléfono"
        icon={<PhoneCall className="text-gray-500" />}
        defaultValue={initialData.phoneNumber || ""}
        onSuccess={() =>
          toast({
            title: "Teléfono actualizado",
            description:
              "Tu número de teléfono se ha actualizado correctamente.",
          })
        }
      />
      <ProfileField
        id="email"
        label="Correo electrónico"
        icon={<Mail className="text-gray-500" />}
        defaultValue={initialData.email || ""}
        onSuccess={() =>
          toast({
            title: "Correo actualizado",
            description:
              "Tu correo electrónico se ha actualizado correctamente.",
          })
        }
      />
      <ProfileField
        id="password"
        label="Contraseña y seguridad"
        icon={<LockKeyhole className="text-gray-500" />}
        defaultValue="********"
        disabled
      />

      <div className="flex gap-4 mt-6">
        <SubmitButton />
        <button
          type="button"
          className="flex w-full justify-center rounded-md border border-red-500 bg-white px-3 py-1.5 text-sm font-semibold text-red-500 hover:bg-red-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-500"
        >
          Eliminar cuenta
        </button>
      </div>
    </div>
  );
}

function ProfileField({
  id,
  label,
  icon,
  defaultValue,
  onSuccess,
  type = "text",
  disabled = false,
}: {
  id: string;
  label: string;
  icon: React.ReactNode;
  defaultValue: string;
  onSuccess?: () => void;
  type?: string;
  disabled?: boolean;
}) {
  const [isEditing, setIsEditing] = React.useState(false);
  const [formState, formAction] = useActionState(
    updateUserProfileAction,
    undefined,
  );

  const handleSubmit = async (formData: FormData) => {
    const value = formData.get(id);

    if (!value || value === defaultValue || disabled) return;

    formAction(formData);
    if (formState?.success) {
      onSuccess?.();
      setIsEditing(false);
    }
  };

  return (
    <form action={handleSubmit} className="space-y-2">
      <label htmlFor={id} className="block text-sm font-medium text-gray-900">
        {label}
      </label>
      <div className="flex items-center gap-2">
        <div className="flex flex-1 items-center border rounded-md px-3 py-2 bg-gray-50">
          <span className="mr-3">{icon}</span>
          <input
            id={id}
            name={id}
            type={type}
            defaultValue={defaultValue}
            disabled={!isEditing || disabled}
            className={`flex-1 bg-transparent border-0 focus:ring-0 sm:text-sm ${
              !isEditing || disabled ? "text-gray-400" : "text-gray-900"
            }`}
          />
        </div>
        <button
          type={isEditing ? "submit" : "button"}
          onClick={() => setIsEditing(!isEditing)}
          className="p-2 rounded-md shadow-sm focus:outline-none"
        >
          {isEditing ? (
            <Check className="text-indigo-600 hover:text-indigo-500" />
          ) : (
            <Edit className="text-gray-600 hover:text-gray-500" />
          )}
        </button>
      </div>
      {formState?.errors?.[id] && (
        <p className="text-red-500 text-sm">{formState.errors[id]}</p>
      )}
    </form>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      disabled={pending}
      type="submit"
      className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
    >
      {pending ? "Cargando..." : "Finalizado"}
    </button>
  );
}
