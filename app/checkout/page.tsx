"use client";
import { useState, useRef, useEffect, useActionState } from "react";
import { useFormStatus } from "react-dom";
import { useToast } from "@/hooks/use-toast";
import { FormState } from "@/types/forms";
import { createOrderAction } from "@/app/_actions/actions";
import { ContactInformation } from "@/components/forms/checkout/ContactInformation";
import { PaymentDetails } from "@/components/forms/checkout/PaymentDetails";
import { DeliveryMethodSection } from "@/components/forms/checkout/DeliveryMethod";
import { ShippingAddress } from "@/components/forms/checkout/ShippingAddress";
import { BillingInformation } from "@/components/forms/checkout/BillingInformation";
import CheckoutOrderSummary from "@/components/checkout/CheckoutOrderSummary";

const deliveryMethods = [
  {
    id: 1,
    title: "Standard",
    turnaround: "4–10 business days",
    price: "$5.00",
  },
  { id: 2, title: "Express", turnaround: "2–5 business days", price: "$16.00" },
];

const initialState: FormState = {};

export default function CSCheckoutPage() {
  const { pending } = useFormStatus();
  const { toast } = useToast();
  const [formState, formAction] = useActionState(
    createOrderAction,
    initialState,
  );
  const [selectedDeliveryMethod, setSelectedDeliveryMethod] = useState(
    deliveryMethods[0],
  );
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (formState.successMsg) {
      toast({ title: "success", description: formState.successMsg });
      formRef.current?.reset();
    }
  }, [formState, toast]);

  return (
    <div className="bg-white">
      {/* Background dividers */}
      <div className="relative mx-auto grid max-w-7xl grid-cols-1 gap-x-16 lg:grid-cols-2 lg:px-8 xl:gap-x-48">
        <h1 className="sr-only">Order information</h1>

        <CheckoutOrderSummary />

        <form
          className="px-4 pb-36 pt-16 sm:px-6 lg:col-start-1 lg:row-start-1 lg:px-0 lg:pb-16"
          action={formAction}
          ref={formRef}
        >
          <div className="mx-auto max-w-lg lg:max-w-none">
            <ContactInformation
              email={formState.data?.email}
              errors={formState.errors}
            />

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
            />

            {/* Submit button section */}
            <div className="mt-10 border-t border-gray-200 pt-6 sm:flex sm:items-center sm:justify-between">
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
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
