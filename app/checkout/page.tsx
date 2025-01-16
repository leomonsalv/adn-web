'use client';
import { useMemo } from 'react';
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
import { ContactInformationSchema } from '@/schemas/contact-information-schema';
import { Button } from '@/components/ui/button';

export default function CSCheckoutPage() {
  const {
    currentStep,
    setCurrentStep,
    paymentType,
    setShippingAddress,
    setContactInformation,
    contactInformation,
    shippingAddress,
  } = useCheckoutStore();

  const { user, loading } = useUser();

  const handleSaveData = (formData: ContactInformationSchema | ShippingAddressSchema) => {
    if ('email' in formData) {
      setContactInformation({
        name: formData.name,
        email: formData.email,
        dni: formData.dni,
        dniType: formData.dniType,
      });
    } else {
      const { lat, lng, isDefault, phone, ...addressData } = formData;
      setShippingAddress({
        ...addressData,
        isDefault,
        lat: lat ?? 0,
        lng: lng ?? 0,
        phone,
        id: 'new',
      });
    }
    setCurrentStep(currentStep + 1);
  };

  const checkoutSteps = useMemo(
    () => [
      {
        id: 1,
        title: 'Información de contacto',
        button:
          contactInformation.email && currentStep !== 1 ? (
            <div className="flex flex-col items-start gap-1">
              <span className="text-sm">{contactInformation.name}</span>
              <span className="text-sm">{contactInformation.email}</span>
              <span className="text-sm">{`${contactInformation.dniType}-${contactInformation.dni}`}</span>
            </div>
          ) : (
            !user && (
              <span className="text-sm font-medium">
                ¿Tienes una cuenta? <span className="font-semibold">Iniciar sesión</span>
              </span>
            )
          ),
        component: (
          <ContactInformation
            name={contactInformation.name}
            email={contactInformation.email}
            dni={contactInformation.dni}
            dniType={contactInformation.dniType}
            onSubmit={handleSaveData}
          />
        ),
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
            onSaveAddress={handleSaveData}
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
    [paymentType, user, contactInformation, currentStep],
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
            onValueChange={() => {
              return;
            }}
            className="data-[state=open]:border-b-0 px-4 pb-36 pt-16 sm:px-6 lg:col-start-1 lg:row-start-1 lg:px-0 lg:pb-16"
          >
            {checkoutSteps.map((step) => (
              <AccordionItem key={step.id} value={step.id.toString()}>
                <AccordionTriggerContent
                  className={cn(
                    'flex w-full justify-between items-center py-6',
                    step.subtitle && 'flex-col items-start',
                    step.id !== currentStep && 'flex-col items-start gap-2.5',
                  )}
                >
                  <div className="flex w-full items-center justify-between gap-2">
                    <h2 className="text-lg font-bold">{step.title}</h2>
                    {step.id === 1 && currentStep !== step.id && contactInformation.email && (
                      <span
                        className="text-sm font-normal text-blue-400 cursor-pointer"
                        onClick={(e) => {
                          e.stopPropagation();
                          setCurrentStep(step.id);
                        }}
                      >
                        Cambiar
                      </span>
                    )}
                  </div>
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
