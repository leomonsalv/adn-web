import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Select } from '@/components/ui/select';
import { zodResolver } from '@hookform/resolvers/zod';
import { LabeledInput } from '../ui/input';
import { Method, ValuesPaymentMixedSchema } from '@/schemas/payment-method-schema';
import { useCartStore } from '@/stores/cart-store';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';

interface PaymentMixedProps {
  paymentMethods: Method[];
  handleSubmit: any;
  isCreatingOrder: boolean;
}

const PaymentMixed: React.FC<PaymentMixedProps> = ({
  paymentMethods,
  handleSubmit,
  isCreatingOrder,
}) => {
  const { getCartRef, getCartTotal } = useCartStore();
  const totalUsd = getCartRef();
  const totalBs = getCartTotal();
  const usd = parseFloat((totalBs / totalUsd).toFixed(2));

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

  const form = useForm<any>({
    resolver: zodResolver(ValuesPaymentMixedSchema),
    defaultValues: {
      method1: paymentOptions[0]?.name,
      amount1: '',
      method2: paymentOptions[1]?.name,
      amount2: '',
    },
  });

  const handleMixedPayment = (item: number, value: any) => {
    const newItem = item === 1 ? 2 : 1;
    const method1 = paymentOptions.find((t) => t.name === form.watch(`method${item}`));
    const method2 = paymentOptions.find((t) => t.name === form.watch(`method${newItem}`));
    const method1Currency = method1?.currency;
    const method2Currency = method2?.currency;

    if ((method1Currency === 'USD' || method2Currency === 'USD') && value > totalUsd) {
      form.setError(`amount${newItem}`, {
        type: 'manual',
        message: 'El monto ingresado no puede ser mayor al total de la orden',
      });
      return;
    }
    if (method1Currency === 'Bs' && value > totalBs) {
      form.setError(`amount${newItem}`, {
        type: 'manual',
        message: 'El monto ingresado no puede ser mayor al total de la orden',
      });
      return;
    }

    if (method1Currency === 'USD' && method2Currency === 'USD') {
      form.setValue(
        `amount${newItem}`,
        method2?.value === 'cash'
          ? Math.ceil(totalUsd - value)
          : parseFloat((totalUsd - value).toFixed(2)),
      );
    } else if (method1Currency === 'Bs' && method2Currency === 'Bs') {
      form.setValue(
        `amount${newItem}`,
        method2?.value === 'bolivarCash' ? Math.ceil(totalBs - value) : totalBs - value,
      );
    } else if (method1Currency === 'USD' && method2Currency === 'Bs') {
      form.setValue(
        `amount${newItem}`,
        method2?.value === 'bolivarCash' ? Math.ceil(totalBs - value * usd) : totalBs - value * usd,
      );
    } else if (method1Currency === 'Bs' && method2Currency === 'USD') {
      form.setValue(
        `amount${newItem}`,
        method2?.value === 'cash' ? Math.ceil(totalUsd - value / usd) : totalUsd - value / usd,
      );
    }
  };

  return (
    <form onSubmit={form.handleSubmit((data) => handleSubmit(data))}>
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
                    value={paymentOptions.find((t) => t.name === field.value)?.name}
                    id="dniType"
                    onChange={(e) => {
                      field.onChange(e.target.value);
                      form.setValue('amount1', '');
                      form.setValue('amount2', '');
                    }}
                  >
                    {paymentOptions
                      .filter((type) => type.name !== form.watch(`method${item === 1 ? 2 : 1}`))
                      .map((type) => (
                        <option key={type.name} value={type.name}>
                          {type.name}
                        </option>
                      ))}
                  </Select>
                </div>
              )}
            />

            <Controller
              control={form.control}
              name={`amount${item}`}
              render={({ field: { onChange, onBlur, value, name }, fieldState: { error } }) => (
                <LabeledInput
                  error={error?.message}
                  className="w-100"
                  labelProps={{
                    htmlFor: `amount${item}`,
                  }}
                  inputProps={{
                    onChange: (e) => {
                      const value = parseFloat(e.target.value);
                      onChange(value);
                      handleMixedPayment(item, value);
                    },
                    onBlur,
                    id: name,
                    name: name,
                    type: 'number',
                    autoComplete: '',
                    value: value,
                  }}
                  label={`Ingrese el monto en ${paymentOptions.find((t) => t.name === form.watch(`method${item}`))?.currency}`}
                />
              )}
            />
          </div>
        </div>
      ))}
      <Button className="w-full mt-4 h-14" type="submit" disabled={isCreatingOrder}>
        {isCreatingOrder ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Continuar con la orden'}
      </Button>
    </form>
  );
};

export default PaymentMixed;
