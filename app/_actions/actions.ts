"use server";

import { convertZodErrors } from "@/lib/utils/forms";
import { checkoutFormSchema } from "@/schemas/checkout-form";
import { FormState } from "@/types/forms";
import { redirect } from "next/navigation";

export async function createUser(prevState: any, formData: FormData) {
  const res = await fetch("https://...");
  const json = await res.json();

  if (!res.ok) {
    return { message: "Please enter a valid email" };
  }

  redirect("/");
}

export const createOrderAction = async (
  prevState: FormState,
  formData: FormData,
): Promise<FormState> => {
  console.log("formData", formData);
  //uncomment to easily view loading state in submit button
  //await sleep(1000);

  //FIXME: deliveryMethod: formData.get("delivery-method") is returning null
  const unValidatedData = {
    email: formData.get("email-address"),
    name: formData.get("name-on-card"),
    cardNumber: formData.get("card-number"),
    expirationDate: formData.get("expiration-date"),
    cvc: formData.get("cvc"),
    deliveryMethod: formData.get("delivery-method"),
    shippingAddress: formData.get("company"),
    address: formData.get("address"),
    apartment: formData.get("apartment"),
    city: formData.get("city"),
    state: formData.get("region"),
    postal: formData.get("postal-code"),
    rememberBilling: formData.get("same-as-shipping"),
  };

  const validated = checkoutFormSchema.safeParse(unValidatedData);

  if (!validated.success) {
    const errors = convertZodErrors(validated.error);
    return {
      errors,
      data: validated.data,
    };
  } else {
    return {
      successMsg: "Deal added successfully!",
    };
  }
};
