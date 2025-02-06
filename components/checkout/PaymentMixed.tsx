import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Select } from '@/components/ui/select';
import { zodResolver } from '@hookform/resolvers/zod';
import { LabeledInput } from '../ui/input';
import { MixedPaymentSchema } from '@/schemas/payment-method-schema';
import { Method } from '@/schemas/payment-method-schema';

interface PaymentMixedProps {
  paymentMethods: Method[];
}

const PaymentMixed: React.FC<PaymentMixedProps> = ({ paymentMethods }) => {
  const form = useForm<any>({
    resolver: zodResolver(MixedPaymentSchema),
  });

  const excludeMethods = {
    // Add methods to exclude from the mix payment options
    paypal: 'paypal',
    puntoventa: 'puntoventa',
    bankTransfer: 'bankTransfer',
    paypaltdc: 'paypaltdc',
    bncPos: 'bncPos',
    bncPosTdc: 'bncPosTdc',
    bncPosNc: 'bncPosNc',
    creditCard: 'creditCard',
    binance: 'binance',
    mBinance: 'mBinance',
    zelle: 'zelle',
    vippo: 'vippo',
    // botonbanesco: 'botonbanesco',
    // preCredit: 'preCredit',
    // motopos: 'motopos',
    botonbanesco: 'botonbanesco',
    // credit: 'credit'
  };

  const paymentOptions = paymentMethods.filter(
    (method: any) => !Object.values(excludeMethods).includes(method.value),
  );

  return (
    <>
      {[1, 2].map((item) => (
        <div className="flex flex-col gap-4">
          <span className="text-sm font-bold">Metodo de Pago N: {item}</span>
          <div className="flex gap-4">
            <Controller
              control={form.control}
              name={`method${item}`}
              render={({ field, fieldState: { error } }) => (
                <div className="w-100">
                  <label htmlFor="dniType" className="block text-sm font-medium text-gray-700 mb-1">
                    Eliga el Método de pago
                  </label>
                  <Select
                    {...field}
                    value={
                      paymentOptions.find((t) => t.name === field.value)?.name ||
                      paymentOptions[0].name
                    }
                    id="dniType"
                  >
                    {paymentOptions.map((type) => (
                      <option key={type.value} value={type.value}>
                        {type.name}
                      </option>
                    ))}
                  </Select>
                </div>
              )}
            />

            <Controller
              control={form.control}
              name="amount1"
              render={({ field: { onChange, onBlur, value, name }, fieldState: { error } }) => (
                <LabeledInput
                  error={error?.message}
                  className="w-100"
                  labelProps={{
                    htmlFor: `amount${item}`,
                  }}
                  inputProps={{
                    onChange,
                    onBlur,
                    id: name,
                    name: name,
                    type: 'number',
                    autoComplete: '',
                  }}
                  label="Ingrese el monto"
                />
              )}
            />
          </div>
        </div>
      ))}
    </>
  );
};

export default PaymentMixed;
