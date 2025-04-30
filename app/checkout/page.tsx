'use client';
import { useMemo, useState } from 'react';
import { ContactInformation } from '@/components/forms/checkout/ContactInformation';
import { PaymentDetails } from '@/components/forms/checkout/PaymentDetails';
import { ShippingAddress } from '@/components/forms/checkout/ShippingAddress';
import CheckoutOrderSummary from '@/components/checkout/CheckoutOrderSummary';
import { Accordion, AccordionTriggerContent } from '@/components/ui/accordion';
import { AccordionContent, AccordionItem } from '@radix-ui/react-accordion';
import { cn } from '@/lib/utils';
import CheckoutSkeleton from '@/components/skeletons/CheckoutSkeleton';
import { useCheckoutStore } from '@/stores/checkout-store';
import type { ShippingAddressSchema } from '@/schemas/shipping-address-schema';
import type { ContactInformationSchema } from '@/schemas/contact-information-schema';
import { DeliveryToggle } from '@/components/checkout/DeliveryToggle';

import useUser from '@/hooks/use-user';

export default function CSCheckoutPage() {
  const { user, isLoading, addresses } = useUser();
  const [deliveryMethod, setDeliveryMethod] = useState<'delivery' | 'pickup'>('delivery');

  const {
    currentStep,
    setCurrentStep,
    paymentType,
    setShippingAddress,
    setContactInformation,
    contactInformation,
    shippingAddress,
  } = useCheckoutStore();

  const handleSaveData = (formData: ContactInformationSchema | ShippingAddressSchema) => {
    if ('email' in formData) {
      setContactInformation({
        name: formData.name,
        fullname: formData.name,
        fullName: formData.name,
        email: formData.email,
        dni: formData.dni,
        dniType: formData.dniType,
      });
    } else {
      const { lat, lng, isDefault, id, phone, ...addressData } = formData;
      setShippingAddress({
        ...addressData,
        isDefault,
        lat: lat ?? 0,
        lng: lng ?? 0,
        phone,
        id: id ?? 'new',
      });
    }
    setCurrentStep(currentStep + 1);
  };

  const filteredAddresses = useMemo(() => {
    if (!addresses?.data) return [];
    return addresses.data.filter((addr: any) =>
      deliveryMethod === 'pickup' ? addr.type === 'pickup' : addr.type === 'delivery',
    );
  }, [addresses?.data, deliveryMethod]);

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
            name={user?.data?.invoiceData?.fullname ?? contactInformation.name}
            email={user?.data?.invoiceData?.email ?? contactInformation.email}
            dni={user?.data?.invoiceData?.dni ?? contactInformation.dni}
            dniType={user?.data?.invoiceData?.dniType ?? contactInformation.dniType}
            onSubmit={handleSaveData}
          />
        ),
      },
      {
        id: 2,
        title: 'Método de entrega',
        button:
          currentStep !== 2 && shippingAddress && shippingAddress.alias !== '' ? (
            <div className="flex flex-col items-start gap-1">
              <span className="text-sm">
                {deliveryMethod === 'pickup' ? 'Retirar en tienda' : 'Envío a domicilio'}
              </span>
              <span className="text-sm">{shippingAddress.alias}</span>
              <span className="text-sm">{shippingAddress.street}</span>
              <span className="text-sm">{shippingAddress.city}</span>
            </div>
          ) : (
            <></>
          ),
        component: (
          <div className="space-y-6">
            <DeliveryToggle
              value={deliveryMethod}
              onChange={(method) => {
                setDeliveryMethod(method);
                setShippingAddress({
                  alias: '',
                  street: '',
                  city: '',
                  state: '',
                  phone: '',
                  isDefault: false,
                  lat: 0,
                  lng: 0,
                  id: 'new',
                  type: method,
                });
              }}
            />

            <ShippingAddress
              title={deliveryMethod === 'pickup' ? 'Punto de retiro' : 'Dirección de envío'}
              type={deliveryMethod === 'pickup' ? 'pickup' : 'delivery'}
              phone={''}
              street={''}
              city={''}
              state={''}
              isDefault={false}
              onSaveAddress={handleSaveData}
              savedAddresses={filteredAddresses}
              shippingAddressId={shippingAddress.id}
            />
          </div>
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
    [paymentType, user, contactInformation, currentStep, addresses],
  );

  if (isLoading) return <CheckoutSkeleton />;

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
                    {step.id === 2 && currentStep !== step.id && (
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
