import { Button, Dialog, DialogBackdrop, DialogPanel } from '@headlessui/react';
import { FormProvider, useForm } from 'react-hook-form';
import { PagoMovil, PagoMovilSchema } from '@/schemas/create-order-schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { DialogActions } from '../ui/dialog';
import { PagoMovilDetails } from './paymentMethods/PagoMovilDetails';

interface PaymentsModalProps {
  open: boolean;
  onClose: () => void;
  onNext: (form: any, setPagomovil: boolean) => void;
  pagoMix: any;
}

export function PaymentsModal({ open, onClose, onNext, pagoMix }: PaymentsModalProps) {
  const form = useForm<PagoMovil>({
    resolver: zodResolver(PagoMovilSchema),
    defaultValues: {
      isConfirmed: true,
      type: 'pagomovil',
      details: {
        dniType: 'V',
        destination: 'amiga',
        amount: pagoMix?.method1 === 'Pago Movil' ? pagoMix.amount1 : pagoMix.amount2,
      },
    },
  });

  const onSubmit = (data: any) => {
    onClose();
    onNext(data, true);
  };

  const handleSubmit = form.handleSubmit((data: any) => onSubmit(data));

  return (
    <Dialog open={open} onClose={onClose} className="relative z-10">
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-black/50 transition-opacity data-closed:opacity-0"
      />

      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4">
          <DialogPanel className="w-full max-w-md transform overflow-hidden rounded-lg bg-white p-6 shadow-xl transition-all">
            <FormProvider {...form}>
              <form onSubmit={handleSubmit}>
                <PagoMovilDetails
                  totalBs={pagoMix?.method1 === 'Pago Movil' ? pagoMix.amount1 : pagoMix.amount2}
                />
                <DialogActions>
                  <Button className="w-full bg-primary px-4 py-2 rounded-lg" type="submit">
                    <span className="text-white font-semibold text-sm cursor-pointer">
                      Continuar
                    </span>
                  </Button>
                </DialogActions>
              </form>
            </FormProvider>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
}
