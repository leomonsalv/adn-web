import CheckoutSection from "@/components/checkout/CheckoutSection";
import { LabeledInput } from "@/components/ui/input";
import { FormState } from "@/types/forms";

interface ContactInformationProps {
  email?: string;
  errors?: FormState["errors"];
}

export function ContactInformation({ email, errors }: ContactInformationProps) {
  return (
    <CheckoutSection title="Contact information">
      <div className="mt-6">
        <LabeledInput
          inputProps={{
            id: "email-address",
            name: "email-address",
            type: "email",
            defaultValue: email,
            autoComplete: "email",
          }}
          label="Email address"
          labelProps={{ htmlFor: "email-address" }}
          error={errors?.email}
        />
      </div>
    </CheckoutSection>
  );
}
