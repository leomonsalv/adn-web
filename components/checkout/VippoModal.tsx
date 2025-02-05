import { Button, Dialog, DialogBackdrop, DialogPanel } from '@headlessui/react';
import { Controller, useForm } from 'react-hook-form';
import { OtpSchema, OtpSchemaType, PaymentMethod } from '@/schemas/create-order-schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { DialogActions } from '../ui/dialog';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';
import { REGEXP_ONLY_DIGITS } from 'input-otp';

interface VippoModalProps {
  open: boolean;
  onClose: () => void;
  previousData: PaymentMethod;
  onNext: (form: any, data?: any) => void;
}

export function VippoModal({ open, onClose, onNext, previousData }: VippoModalProps) {
  const form = useForm<OtpSchemaType>({
    resolver: zodResolver(OtpSchema),
    defaultValues: {
      token: '',
    },
  });

  const onSubmit = (data: any) => {
    onClose();
    onNext({
      ...previousData,
      details: { ...previousData.details, token: parseFloat(data.token) },
    });
  };

  return (
    <Dialog open={open} onClose={onClose} className="relative z-10">
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-black/50 transition-opacity data-closed:opacity-0"
      />

      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4">
          <DialogPanel className="w-full max-w-md transform overflow-hidden rounded-lg bg-white p-6 shadow-xl transition-all">
            <h2 className="text-lg font-semibold text-gray-900">Verificación de PIN</h2>

            <div className="flex flex-col gap-4 mt-2">
              <span className=" text-gray-900">
                Por favor, ingresa el PIN de 3 dígitos para continuar.
              </span>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <div className="flex justify-center">
                  <Controller
                    control={form.control}
                    name="token"
                    render={({ field, fieldState: { error } }) => (
                      <div>
                        <InputOTP maxLength={3} {...field} pattern={REGEXP_ONLY_DIGITS}>
                          <InputOTPGroup>
                            <InputOTPSlot index={0} />
                            <InputOTPSlot index={1} />
                            <InputOTPSlot index={2} />
                          </InputOTPGroup>
                        </InputOTP>
                        <span>{error?.message}</span>
                      </div>
                    )}
                  />
                </div>

                <DialogActions>
                  <Button className="w-full bg-primary px-4 py-2 rounded-lg" type="submit">
                    <span className="text-white font-semibold text-sm">Finalizar Orden</span>
                  </Button>
                </DialogActions>
              </form>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
}
