'use client';
import { useState, useRef, useEffect, useActionState } from 'react';
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

const deliveryMethods = [
  {
    id: 1,
    title: 'Standard',
    turnaround: '4–10 business days',
    price: '$5.00',
  },
  { id: 2, title: 'Express', turnaround: '2–5 business days', price: '$16.00' },
];

const checkoutSteps = [
  {
    id: 1,
    title: 'Información de contacto',
    button: (
      <span className="text-sm font-medium">
        ¿Tienes una cuenta? <span className="font-semibold">Iniciar sesión</span>
      </span>
    ),
    component: <ContactInformation />,
  },
  {
    id: 2,
    title: 'Dirección de envío',
    component: <ShippingAddress phone={''} street={''} city={''} state={''} isDefault={false} />,
  },
  {
    id: 3,
    title: 'Método de pago',
    subtitle: 'Todas las transacciones son seguras y están encriptadas',
    component: <PaymentDetails />,
  },
  // { id: 5, title: 'Dirección de facturación', component: <BillingInformation /> },
];

export default function CSCheckoutPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedDeliveryMethod, setSelectedDeliveryMethod] = useState(deliveryMethods[0]);
  const formRef = useRef<HTMLFormElement>(null);
  const [paymentType, setPaymentType] = useState<'simple' | 'mixed'>('simple');

  return (
    <div className="bg-white">
      {/* Background dividers */}
      <div className="relative mx-auto grid max-w-7xl grid-cols-1 gap-x-16 lg:grid-cols-2 lg:px-8 xl:gap-x-48">
        <h1 className="sr-only">Order information</h1>

        <CheckoutOrderSummary />

        <div className="mx-auto max-w-lg lg:max-w-none">
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
            {/* <AccordionItem value="contact-information">
                <AccordionTriggerContent className="flex w-full justify-between items-center py-6">
                  <h2 className="text-lg font-bold">Información de contacto</h2>
                  <span className="text-sm font-medium">
                    ¿Tienes una cuenta? <span className="font-semibold">Iniciar sesión</span>
                  </span>
                </AccordionTriggerContent>
              </AccordionItem>
              <AccordionItem value="contact-information">
                <AccordionTriggerContent className="flex w-full justify-between items-center py-6">
                  <h2 className="text-lg font-bold">Dirección de envío</h2>
                </AccordionTriggerContent>
              </AccordionItem>
              <AccordionItem value="payment-details">
                <AccordionTriggerContent className="flex flex-col w-full justify-center py-6">
                  <h2 className="text-lg font-bold">Método de pago</h2>

                  <span className="text-sm">
                    Todas las transacciones son seguras y están encriptadas
                  </span>
                </AccordionTriggerContent>
                <AccordionContent className="flex flex-col gap-y-6 justify-center items-center">
                  <PaymentToggle
                    value={paymentType}
                    onChange={(value) => {
                      setPaymentType(value);
                    }}
                  />

                  {data && <PaymentMethodSelector paymentMethods={data} />}
                </AccordionContent>
              </AccordionItem> */}

            {/* <ContactInformation email={formState.data?.email} errors={formState.errors} />

              <PaymentDetails
                name={formState.data?.name}
                cardNumber={formState.data?.cardNumber}
                expirationDate={formState.data?.expirationDate}
                cvc={formState.data?.cvc}
                errors={formState.errors}
              />

              <DeliveryMethodSection
                deliveryMethods={deliveryMethods}
                selectedDeliveryMethod={selectedDeliveryMethod}
                setSelectedDeliveryMethod={setSelectedDeliveryMethod}
              />

              <ShippingAddress
                shippingAddress={formState.data?.shippingAddress}
                address={formState.data?.address}
                apartment={formState.data?.apartment}
                city={formState.data?.city}
                state={formState.data?.state}
                postal={formState.data?.postal}
                errors={formState.errors}
              />

              <BillingInformation
                rememberBilling={formState.data?.rememberBilling}
                errors={formState.errors}
              /> */}
          </Accordion>

          {/* Submit button section */}
          {/* <div className="mt-10 border-gray-200 pt-6 sm:flex sm:items-center sm:justify-between">
              <button
                disabled={pending}
                type="submit"
                className="w-full rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50 sm:order-last sm:ml-6 sm:w-auto"
              >
                Continue
              </button>
              <p className="mt-4 text-center text-sm text-gray-500 sm:mt-0 sm:text-left">
                You won't be charged until the next step.
              </p>
            </div> */}
        </div>
      </div>
    </div>
  );
}
