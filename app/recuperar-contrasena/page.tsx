"use client";
import { LOGIN } from "@/lib/routes";
import { useRouter } from "next/navigation";
import Link from "next/link";
import ForgotPasswordForm from "@/components/forms/auth/forgot-password-form";

export default function ForgotPasswordPage() {
  const router = useRouter();

  return (
    <section>
      <div className="flex min-h-full flex-1 flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <img
            alt="Your Company"
            src="https://tailwindui.com/plus/img/logos/mark.svg?color=indigo&shade=600"
            className="mx-auto h-10 w-auto"
          />
          <h2 className="mt-6 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
            Ops😳! No te preocupes, podemos ayudarte
          </h2>
          <p>
            Ingresa tu dirección de correo electrónico para recuperar tu
            contraseña
          </p>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-[480px]">
          <div className="bg-white px-6 py-2 shadow sm:rounded-lg sm:px-12">
            <ForgotPasswordForm />
          </div>

          <p className="mt-10 text-center text-sm/6 text-gray-500">
            <Link
              href={LOGIN}
              className="font-semibold text-indigo-600 hover:text-indigo-500"
            >
              Volver al login
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}
