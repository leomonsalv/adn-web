import CheckoutSection from "@/components/checkout/CheckoutSection";
import { LabeledInput } from "@/components/ui/input";
import { FormState } from "@/types/forms";

interface PaymentDetailsProps {
  name?: string;
  cardNumber?: string;
  expirationDate?: string;
  cvc?: string;
  errors?: FormState["errors"];
}

export function PaymentDetails({
  name,
  cardNumber,
  expirationDate,
  cvc,
  errors,
}: PaymentDetailsProps) {
  return (
    <CheckoutSection title="Payment details" className="mt-10">
      <div className="mt-6 grid grid-cols-3 gap-x-4 gap-y-6 sm:grid-cols-4">
        <div className="col-span-3 sm:col-span-4">
          <LabeledInput
            inputProps={{
              id: "name-on-card",
              name: "name-on-card",
              type: "text",
              defaultValue: name,
              autoComplete: "cc-name",
            }}
            label="Name on card"
            labelProps={{ htmlFor: "name-on-card" }}
            error={errors?.name}
          />
        </div>

        <div className="col-span-3 sm:col-span-4">
          <div className="mt-1">
            <LabeledInput
              inputProps={{
                id: "card-number",
                name: "card-number",
                type: "text",
                defaultValue: cardNumber,
                autoComplete: "cc-number",
              }}
              label="Card number"
              labelProps={{ htmlFor: "card-number" }}
              error={errors?.cardNumber}
            />
          </div>
          <div className="h-8">
            {errors?.cardNumber && (
              <small className="text-red-400">{errors.cardNumber}</small>
            )}
          </div>
        </div>

        <div className="col-span-2 sm:col-span-3">
          <LabeledInput
            inputProps={{
              id: "expiration-date",
              name: "expiration-date",
              type: "text",
              defaultValue: expirationDate,
              autoComplete: "cc-exp",
              className:
                "block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm",
            }}
            label="Expiration date (MM/YY)"
            labelProps={{ htmlFor: "expiration-date" }}
            error={errors?.expirationDate}
          />
        </div>

        <div>
          <LabeledInput
            inputProps={{
              id: "cvc",
              name: "cvc",
              type: "text",
              defaultValue: cvc,
              autoComplete: "cc-csc",
              className:
                "block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm",
            }}
            label="CVC"
            labelProps={{ htmlFor: "cvc" }}
            error={errors?.cvc}
          />
        </div>
      </div>
    </CheckoutSection>
  );
}
