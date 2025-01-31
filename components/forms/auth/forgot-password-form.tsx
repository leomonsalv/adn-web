'use client';

import React, { useActionState } from 'react';
import { HOME } from '@/lib/routes';
import { forgotPasswordAction } from '@/app/_actions/auth';
import { useFormStatus } from 'react-dom';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';

type Props = {};

function ForgotPasswordForm({}: Props) {
  const [formState, formAction] = useActionState(forgotPasswordAction, undefined);

  const { toast } = useToast();
  const router = useRouter();

  React.useEffect(() => {
    if (formState?.success) {
      toast({
        title: 'Correo enviado',
        description: 'Por favor revisa tu bandeja de entrada.',
      });
      router.push(HOME);
    }
  }, [formState, toast, router]);

  return (
    <form action={formAction} className="space-y-6">
      <div>
        <label htmlFor="email" className="block text-sm/6 font-medium text-gray-900">
          Correo electrónico
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

      <SubmitButton />
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
      {pending ? 'Loading...' : 'Recuperar contraseña'}
    </button>
  );
}

export default ForgotPasswordForm;
