import { FormState } from "@/types/forms";

interface ShippingAddressProps {
  shippingAddress?: string;
  address?: string;
  apartment?: string;
  city?: string;
  state?: string;
  postal?: string;
  errors?: FormState["errors"];
}

export function ShippingAddress({
  shippingAddress,
  address,
  apartment,
  city,
  state,
  postal,
  errors,
}: ShippingAddressProps) {
  return (
    <section aria-labelledby="shipping-heading" className="mt-10">
      <h2 id="shipping-heading" className="text-lg font-medium text-gray-900">
        Shipping address
      </h2>

      <div className="mt-6 grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-3">
        <div className="sm:col-span-3">
          <label
            htmlFor="company"
            className="block text-sm font-medium text-gray-700"
          >
            Company
          </label>
          <div className="mt-1">
            <input
              id="company"
              name="company"
              defaultValue={shippingAddress}
              type="text"
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>
          <div className="h-8">
            {errors?.shippingAddress && (
              <small className="text-red-400">{errors.shippingAddress}</small>
            )}
          </div>
        </div>

        <div className="sm:col-span-3">
          <label
            htmlFor="address"
            className="block text-sm font-medium text-gray-700"
          >
            Address
          </label>
          <div className="mt-1">
            <input
              id="address"
              name="address"
              type="text"
              defaultValue={address}
              autoComplete="street-address"
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>
          <div className="h-8">
            {errors?.address && (
              <small className="text-red-400">{errors.address}</small>
            )}
          </div>
        </div>

        <div className="sm:col-span-3">
          <label
            htmlFor="apartment"
            className="block text-sm font-medium text-gray-700"
          >
            Apartment, suite, etc.
          </label>
          <div className="mt-1">
            <input
              id="apartment"
              name="apartment"
              defaultValue={apartment}
              type="text"
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>
          <div className="h-8">
            {errors?.apartment && (
              <small className="text-red-400">{errors.apartment}</small>
            )}
          </div>
        </div>

        <div>
          <label
            htmlFor="city"
            className="block text-sm font-medium text-gray-700"
          >
            City
          </label>
          <div className="mt-1">
            <input
              id="city"
              name="city"
              type="text"
              defaultValue={city}
              autoComplete="address-level2"
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>
          <div className="h-8">
            {errors?.city && (
              <small className="text-red-400">{errors.city}</small>
            )}
          </div>
        </div>

        <div>
          <label
            htmlFor="region"
            className="block text-sm font-medium text-gray-700"
          >
            State / Province
          </label>
          <div className="mt-1">
            <input
              id="region"
              name="region"
              type="text"
              defaultValue={state}
              autoComplete="address-level1"
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>
          <div className="h-8">
            {errors?.state && (
              <small className="text-red-400">{errors.state}</small>
            )}
          </div>
        </div>

        <div>
          <label
            htmlFor="postal-code"
            className="block text-sm font-medium text-gray-700"
          >
            Postal code
          </label>
          <div className="mt-1">
            <input
              id="postal-code"
              name="postal-code"
              type="text"
              defaultValue={postal}
              autoComplete="postal-code"
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>
        </div>
        <div className="h-8">
          {errors?.postal && (
            <small className="text-red-400">{errors.postal}</small>
          )}
        </div>
      </div>
    </section>
  );
}
