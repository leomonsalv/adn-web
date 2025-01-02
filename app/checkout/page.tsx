'use client';
import { useState, useRef, useEffect, useActionState, useMemo } from 'react';
import { useFormStatus } from 'react-dom';
import { useToast } from '@/hooks/use-toast';
import { FormState } from '@/types/forms';
import { createOrderAction } from '@/app/_actions/actions';
import { ContactInformation } from '@/components/forms/checkout/ContactInformation';
import { PaymentDetails } from '@/components/forms/checkout/PaymentDetails';
import { DeliveryMethodSection } from '@/components/forms/checkout/DeliveryMethod';
import { ShippingAddress } from '@/components/forms/checkout/ShippingAddress';
import { BillingInformation } from '@/components/forms/checkout/BillingInformation';
import CheckoutOrderSummary from '@/components/checkout/CheckoutOrderSummary';
import { Accordion, AccordionTrigger, AccordionTriggerContent } from '@/components/ui/accordion';
import { AccordionContent, AccordionItem } from '@radix-ui/react-accordion';
import { Button } from '@/components/ui/button';
import useCheckout from '@/hooks/use-checkout';
import { Switch, SwitchField, SwitchGroup } from '@/components/ui/switch';
import { PaymentToggle } from '@/components/checkout/PaymentToggle';
import { PaymentMethodSelector } from '@/components/checkout/PaymentMethodSelector';
import { cn } from '@/lib/utils';
import { useUser } from '@/hooks/use-user';
import CheckoutSkeleton from '@/components/skeletons/CheckoutSkeleton';
import { useCheckoutStore } from '@/stores/checkout-store';

const deliveryMethods = [
  {
    id: 1,
    title: 'Standard',
    turnaround: '4–10 business days',
    price: '$5.00',
  },
  { id: 2, title: 'Express', turnaround: '2–5 business days', price: '$16.00' },
];

export default function CSCheckoutPage() {
  const formRef = useRef<HTMLFormElement>(null);
  const { currentStep, setCurrentStep, paymentType } = useCheckoutStore();

  const { user, loading } = useUser();

  const checkoutSteps = useMemo(
    () => [
      {
        id: 1,
        title: 'Información de contacto',
        button: !user && (
          <span className="text-sm font-medium">
            ¿Tienes una cuenta? <span className="font-semibold">Iniciar sesión</span>
          </span>
        ),
        component: <ContactInformation />,
      },
      { id: 2, title: 'Dirección de envío', component: <ShippingAddress /> },
      {
        id: 3,
        title: 'Método de pago',
        subtitle: 'Todas las transacciones son seguras y están encriptadas',
        component: <PaymentDetails />,
      },
      // { id: 5, title: 'Dirección de facturación', component: <BillingInformation /> },
    ],
    [paymentType, user],
  );

  if (loading) return <CheckoutSkeleton />;

  return (
    <div className="bg-white">
      {/* Background dividers */}
      <div className="relative mx-auto grid max-w-7xl grid-cols-1 gap-x-16 lg:grid-cols-2 lg:px-8 xl:gap-x-48">
        <h1 className="sr-only">Order information</h1>

        <CheckoutOrderSummary />

        <div className="px-4 pb-10 pt-4 sm:px-6 lg:bg-transparent lg:px-0 lg:pb-16">
          <Accordion
            type="single"
            collapsible
            value={currentStep.toString()}
            onValueChange={(value) => {
              setCurrentStep(parseInt(value));
            }}
            className="data-[state=open]:border-b-0 px-4 pb-36 pt-16 sm:px-6 lg:col-start-1 lg:row-start-1 lg:px-0 lg:pb-16"
          >
            {checkoutSteps.map((step) => (
              <AccordionItem key={step.id} value={step.id.toString()}>
                <AccordionTriggerContent
                  className={cn(
                    'flex w-full justify-between items-center py-6',
                    step.subtitle && 'flex-col items-start',
                  )}
                >
                  <h2 className="text-lg font-bold">{step.title}</h2>
                  {step.button && <span className="text-sm">{step.button}</span>}
                  {step.subtitle && <span className="text-sm">{step.subtitle}</span>}
                </AccordionTriggerContent>
                <AccordionContent>{step.component}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </div>
  );
}
