'use client';

import React, { useActionState } from 'react';
import { HOME, RECOVER_PASSWORD } from '@/lib/routes';
import { signInAction } from '@/app/_actions/auth';
import { useFormStatus } from 'react-dom';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';

type Props = {};

function LoginForm({}: Props) {
  const [formState, formAction] = useActionState(signInAction, undefined);

  const { toast } = useToast();
  const router = useRouter();

  React.useEffect(() => {
    if (formState?.success) {
      toast({
        title: 'Inicio exitoso',
        description: 'Redirigiendo al home...',
      });
      router.push(HOME);
    } else if (formState?.errorCode || formState?.errors) {
      toast({
        title: 'Verificación fallida',
        description: 'Por favor revisa tus datos.',
        variant: 'destructive',
      });
    }
  }, [formState, toast, router]);

  return (
    <form action={formAction} className="space-y-6">
      <div>
        <label htmlFor="email" className="block text-sm/6 font-medium text-gray-900">
          Correo Electrónico
        </label>
        <div className="mt-2">
          <input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-xs ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
          />
        </div>
        {formState?.errors?.email && <p className="text-red-500">{formState.errors.email}</p>}
      </div>

      <div>
        <label htmlFor="password" className="block text-sm/6 font-medium text-gray-900">
          Contraseña
        </label>
        <div className="mt-2">
          <input
            id="password"
            name="password"
            type="password"
            required
            autoComplete="current-password"
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-xs ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
          />
        </div>
        {formState?.errors?.password && (
          <div>
            <p>La contraseña debe: </p>
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

      <div className="flex items-center justify-between">
        <div className="flex items-center">
          {/* TODO: ADD A REMEMBER ME */}
          <input
            id="remember-me"
            name="remember-me"
            type="checkbox"
            className="size-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
          />
          <label htmlFor="remember-me" className="ml-3 block text-sm/6 text-gray-900">
            Recuerdame
          </label>
        </div>

        <div className="text-sm/6">
          <a
            href={RECOVER_PASSWORD}
            className="font-semibold text-indigo-600 hover:text-indigo-500"
          >
            Recuperar contraseña
          </a>
        </div>
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
      className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
    >
      {pending ? 'Cargando...' : 'Inicia Sesión'}
    </button>
  );
}

export default LoginForm;
