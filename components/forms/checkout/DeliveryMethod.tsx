import { Radio, RadioGroup } from "@headlessui/react";
import { CheckCircleIcon } from "@heroicons/react/20/solid";

interface DeliveryMethod {
  id: number;
  title: string;
  turnaround: string;
  price: string;
}

interface DeliveryMethodSectionProps {
  deliveryMethods: DeliveryMethod[];
  selectedDeliveryMethod: DeliveryMethod;
  setSelectedDeliveryMethod: (method: DeliveryMethod) => void;
}

export function DeliveryMethodSection({
  deliveryMethods,
  selectedDeliveryMethod,
  setSelectedDeliveryMethod,
}: DeliveryMethodSectionProps) {
  return (
    <div className="mt-10 border-t border-gray-200 pt-10">
      <fieldset>
        <legend className="text-lg font-medium text-gray-900">
          Delivery method
        </legend>
        <RadioGroup
          id="delivery-method"
          value={selectedDeliveryMethod}
          onChange={setSelectedDeliveryMethod}
          className="mt-4 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4"
        >
          {deliveryMethods.map((deliveryMethod) => (
            <Radio
              id="delivery-method"
              key={deliveryMethod.id}
              value={deliveryMethod}
              aria-label={deliveryMethod.title}
              aria-description={`${deliveryMethod.turnaround} for ${deliveryMethod.price}`}
              className="group relative flex cursor-pointer rounded-lg border border-gray-300 bg-white p-4 shadow-sm focus:outline-none data-[checked]:border-transparent data-[focus]:ring-2 data-[focus]:ring-indigo-500"
            >
              <span className="flex flex-1">
                <span className="flex flex-col">
                  <span className="block text-sm font-medium text-gray-900">
                    {deliveryMethod.title}
                  </span>
                  <span className="mt-1 flex items-center text-sm text-gray-500">
                    {deliveryMethod.turnaround}
                  </span>
                  <span className="mt-6 text-sm font-medium text-gray-900">
                    {deliveryMethod.price}
                  </span>
                </span>
              </span>
              <CheckCircleIcon
                aria-hidden="true"
                className="size-5 text-indigo-600 [.group:not([data-checked])_&]:hidden"
              />
              <span
                aria-hidden="true"
                className="pointer-events-none absolute -inset-px rounded-lg border-2 border-transparent group-data-[focus]:border group-data-[checked]:border-indigo-500"
              />
            </Radio>
          ))}
        </RadioGroup>
      </fieldset>
    </div>
  );
}
