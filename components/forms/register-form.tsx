"use client";

import React, { useActionState } from "react";
import { HOME } from "@/lib/routes";
import { registerAction } from "@/app/_actions/auth";
import { useFormStatus } from "react-dom";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";

type Props = {};

function RegisterForm({}: Props) {
  const [formState, formAction] = useActionState(registerAction, undefined);

  const { toast } = useToast();
  const router = useRouter();

  React.useEffect(() => {
    if (formState?.success) {
      toast({
        title: "Registro exitoso",
        description: "Redirigiendo al home...",
      });
      router.push(HOME);
    } else if (formState?.errorCode || formState?.errors) {
      toast({
        title: "Verificación fallida",
        description: "Por favor revisa tus datos.",
        variant: "destructive",
      });
    }
  }, [formState, toast, router]);

  return (
    <form action={formAction} className="space-y-6">
      <div>
        <label
          htmlFor="name"
          className="block text-sm/6 font-medium text-gray-900"
        >
          Nombre
        </label>
        <div className="mt-2">
          <input
            id="name"
            name="name"
            type="name"
            required
            autoComplete="name"
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
          />
        </div>
        {formState?.errors?.name && (
          <p className="text-red-500">{formState.errors.name}</p>
        )}
      </div>

      <div>
        <label
          htmlFor="email"
          className="block text-sm/6 font-medium text-gray-900"
        >
          Correo electrónico
        </label>
        <div className="mt-2">
          <input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
          />
        </div>
        {formState?.errors?.email && (
          <p className="text-red-500">{formState.errors.email}</p>
        )}
      </div>

      <div>
        <label
          htmlFor="password"
          className="block text-sm/6 font-medium text-gray-900"
        >
          Contraseña
        </label>
        <div className="mt-2">
          <input
            id="password"
            name="password"
            type="password"
            required
            autoComplete="current-password"
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
          />
        </div>
        {formState?.errors?.password && (
          <div>
            <p>La contraseña tiene que tener los siguientes parámetros:</p>
            <ul>
              {formState.errors.password.map((error) => (
                <li className="text-red-500" key={error}>
                  - {error}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <div>
        <label
          htmlFor="referral"
          className="block text-sm/6 font-medium text-gray-900"
        >
          Código de referido
        </label>
        <div className="mt-2">
          <input
            id="referral"
            name="referral"
            type="referral"
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
          />
        </div>
        {formState?.errors?.referral && (
          <p className="text-red-500">{formState.errors.referral}</p>
        )}
      </div>

      <div>
        <SubmitButton />
      </div>
    </form>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      disabled={pending}
      type="submit"
      className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
    >
      {pending ? "Cargando..." : "Registrarse"}
    </button>
  );
}

export default RegisterForm;
