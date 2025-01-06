import { useMemo, useState } from 'react';

import { Card, CardContent } from '@/components/ui/card';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { Method } from '@/schemas/payment-method-schema';
import { Radio, RadioField, RadioGroup } from '../ui/radio';

import {
  Accordion,
  AccordionContent,
  AccordionTriggerContent,
  AccordionItem,
} from '../ui/accordion';
import { LabeledInput } from '../ui/input';
import { useCartStore } from '@/stores/cart-store';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  PaymentMethodType,
  PaymentDetailsUnionType,
  PaymentDetailsUnionSchema,
} from '@/schemas/create-order-schema';
import { Button } from '../ui/button';

export function PaymentMethodSelector({ paymentMethods }: { paymentMethods: Method[] }) {
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethodType>(
    paymentMethods.find((method) => method.value === 'cash')?.value!,
  );

  const currency = useMemo(() => {
    return paymentMethods.find((method) => method.value === selectedMethod)?.currency;
  }, [selectedMethod, paymentMethods]);

  const requiresAmount = useMemo(() => {
    return selectedMethod === 'cash' || selectedMethod === 'bolivarCash';
  }, [selectedMethod]);

  console.log('🚀 ~ PaymentMethodSelector ~ selectedMethod:', selectedMethod);

  const { getCartRef, getCartTotal } = useCartStore();

  const totalUsd = getCartRef();
  const totalBs = getCartTotal();

  const form = useForm<PaymentDetailsUnionType>({
    resolver: zodResolver(PaymentDetailsUnionSchema),
    defaultValues: {
      type: selectedMethod,
      details: {
        amount: requiresAmount ? (currency === 'Bs' ? totalBs : totalUsd) : 0,
        email: 'juankrlosbn@gmail.com',
        nombre: '',
      },
    },
  });

  const onSubmit = (data: PaymentDetailsUnionType) => {
    console.log('🚀 ~ onSubmit ~ data:', data);
  };

  const handleRadioChange = (value: PaymentMethodType) => {
    setSelectedMethod(value);
    form.reset({
      type: value,
      details: {
        amount: requiresAmount ? (currency === 'Bs' ? totalBs : totalUsd) : 0,
        nombre: '',
        email: 'juankrlosbn@gmail.com',
      },
    });
  };

  console.log('🚀 ~ PaymentMethodSelector ~ form.formState.errors:', form.formState.errors);
  console.log('🚀 ~ PaymentMethodSelector ~ form.formState.isValid:', form.getValues());

  const showPaymentDetails = (method: Method) => {
    switch (method.value) {
      case 'zelle':
        return (
          <div className="flex flex-col gap-y-4">
            <div className="flex flex-col gap-y-2">
              <h6 className="text-sm font-semibold">Pagos por Zelle</h6>
              <p className="text-sm">
                Ingresa a la plataforma de tu banco y haz un pago por $8.1 USD a los siguientes
                datos:
              </p>
            </div>
            <Card className="bg-[#232F3E] pt-6">
              <CardContent className="flex flex-col gap-y-1">
                <span className="text-white">Monto</span>
                <span className="text-white text-sm font-semibold">${totalUsd.toFixed(2)}</span>
              </CardContent>
              <CardContent className="flex flex-col gap-y-1">
                <span className="text-white">A nombre de</span>
                <span className="text-white text-sm font-semibold">Modu LLC</span>
              </CardContent>
              <CardContent className="flex flex-col gap-y-1">
                <span className="text-white">Correo</span>
                <span className="text-white text-sm font-semibold">pagos@adanfarmacia.com</span>
              </CardContent>
            </Card>
            <div className="flex flex-col">
              <Controller
                control={form.control}
                name="details.nombre"
                render={({
                  field: { onChange, onBlur, value, name, ref },
                  fieldState: { error },
                }) => (
                  <LabeledInput
                    ref={ref}
                    error={error?.message}
                    label="Nombre del titular"
                    inputProps={{
                      placeholder: 'Nombre del titular',
                      onChange: onChange,
                      onBlur: onBlur,
                      value: value,
                      name: name,
                      type: 'text',
                    }}
                    labelProps={{ className: 'text-sm font-semibold' }}
                  />
                )}
              />
            </div>
          </div>
        );
      case 'cash':
        return (
          <div className="flex flex-col gap-y-4">
            <div className="flex flex-col gap-y-2">
              <h6 className="text-sm font-semibold">Pagos por Efectivo</h6>
              <h5 className="text-base font-semibold">¿Con cuánto dinero vas a pagar?</h5>
              <p className="text-sm">
                Recuerda que el valor del pedido es de &nbsp;
                <span className="font-semibold">${totalUsd.toFixed(2)}</span> USD y el vuelto se da
                por Pago Móvil.
              </p>
            </div>
            <div className="flex flex-col">
              <Controller
                control={form.control}
                name="details.amount"
                render={({ field }) => (
                  <LabeledInput
                    {...field}
                    label="Ingresa el monto de efectivo"
                    inputProps={{ placeholder: 'Ingresa el monto' }}
                    labelProps={{ className: 'text-sm font-semibold' }}
                  />
                )}
              />
            </div>
          </div>
        );
      case 'bolivarCash':
      case 'motopos':
        return (
          <div className="flex flex-col gap-y-4">
            <div className="flex flex-col gap-y-2">
              <h6 className="text-sm font-semibold">Pagos por Punto de Venta</h6>
              <p className="text-sm">
                El motorizado llevará el punto de venta a tu domicilio. Deberás pagar el total de
                &nbsp;<span className="font-semibold">Bs. {totalBs.toFixed(2)}</span>.
              </p>
            </div>
          </div>
        );
      case 'mBinance':
        return (
          <div className="flex flex-col gap-y-4">
            <div className="flex flex-col gap-y-2">
              <h6 className="text-sm font-semibold">Pagos por Binance</h6>
              <p className="text-sm">
                Ingresa a tu cuenta de Binance y haz un pago por{' '}
                <span className="font-semibold">${totalUsd.toFixed(2)}</span> USD a los siguientes
                datos:
              </p>
            </div>
            <Card className="pt-6">
              <CardContent className="flex flex-col gap-y-1">
                {method.qr && (
                  <Image
                    src={method.qr}
                    alt="Binance"
                    width={300}
                    height={300}
                    className="rounded-lg w-full"
                  />
                )}
              </CardContent>
            </Card>
            <form className="flex flex-col">
              <Controller
                control={form.control}
                name="details.nombre"
                render={({ field }) => (
                  <LabeledInput
                    {...field}
                    label="Nombre del titular de Binance"
                    inputProps={{ placeholder: 'Nombre del titular' }}
                    labelProps={{ className: 'text-sm font-semibold' }}
                  />
                )}
              />
            </form>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <Accordion
      type="single"
      value={selectedMethod}
      onValueChange={handleRadioChange}
      onKeyDown={(e) => {
        if (e.target instanceof HTMLInputElement && e.target.type === 'text') {
          e.stopPropagation();
          e.preventDefault();
          return true;
        }
      }}
      className="flex flex-col w-full border rounded-lg"
    >
      <RadioGroup
        value={selectedMethod}
        onChange={handleRadioChange}
        onKeyDown={(e) => {
          if (e.target instanceof HTMLInputElement) {
            e.stopPropagation();
          }
        }}
        className="space-y-0 p-0"
      >
        {paymentMethods.map((method, index) => (
          <AccordionItem key={method.value} value={method.value} className="border-0 focus:ring-0">
            <Card
              className={cn(
                'border-0 rounded-none focus:ring-0 shadow-none bg-transparent mt-0',
                selectedMethod === method.value || paymentMethods.length - 1 !== index
                  ? 'border-b'
                  : '',
              )}
            >
              <AccordionTriggerContent className="flex w-full px-4 py-3 items-center justify-between">
                <div className="flex items-center justify-between w-full">
                  <div className="flex gap-x-3">
                    <RadioField>
                      <Radio value={method.value} />
                    </RadioField>
                    {method.icon && (
                      <Image src={method.icon} alt={method.name} width={24} height={24} />
                    )}
                    <span className="font-medium">{method.name}</span>
                  </div>
                </div>
              </AccordionTriggerContent>
            </Card>
            <AccordionContent className={cn('px-3 border-b bg-gray-50')}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="flex flex-col gap-y-4 px-2 pt-4 pb-2"
              >
                <div className="flex flex-col gap-y-4 px-2 pt-4 pb-2">
                  {showPaymentDetails(method)}
                </div>
                <Button type="submit" className="self-end">
                  Continuar
                </Button>
              </form>
            </AccordionContent>
          </AccordionItem>
        ))}
      </RadioGroup>
    </Accordion>
  );
}
