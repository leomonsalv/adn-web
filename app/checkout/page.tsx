'use client';
import { useRef, useMemo } from 'react';
import { ContactInformation } from '@/components/forms/checkout/ContactInformation';
import { PaymentDetails } from '@/components/forms/checkout/PaymentDetails';
import { ShippingAddress } from '@/components/forms/checkout/ShippingAddress';
import CheckoutOrderSummary from '@/components/checkout/CheckoutOrderSummary';
import { Accordion, AccordionTriggerContent } from '@/components/ui/accordion';
import { AccordionContent, AccordionItem } from '@radix-ui/react-accordion';
import { cn } from '@/lib/utils';
import { useUser } from '@/hooks/use-user';
import CheckoutSkeleton from '@/components/skeletons/CheckoutSkeleton';
import { useCheckoutStore } from '@/stores/checkout-store';
import { ShippingAddressSchema } from '@/schemas/shipping-address-schema';

export default function CSCheckoutPage() {
  const { currentStep, setCurrentStep, paymentType, setShippingAddress, setContactInformation } =
    useCheckoutStore();

  const { user, loading } = useUser();

  const handleShippingSubmit = (formData: ShippingAddressSchema) => {
    const { lat, lng, isDefault, phone, ...addressData } = formData;

    setShippingAddress({
      street: addressData.street,
      city: addressData.city,
      state: addressData.state,
      isDefault,
      lat: lat ?? 0,
      lng: lng ?? 0,
      phone,
    });

    setCurrentStep(currentStep + 1);
  };

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
      {
        id: 2,
        title: 'Dirección de envío',
        component: (
          <ShippingAddress
            phone={''}
            street={''}
            city={''}
            state={''}
            isDefault={false}
            onSaveAddress={handleShippingSubmit}
          />
        ),
      },
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
