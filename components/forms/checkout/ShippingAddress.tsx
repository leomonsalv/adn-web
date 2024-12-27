import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { LabeledInput } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { ShippingAddressSchema, shippingAddressSchema } from '@/schemas/shipping-address-schema';
import { MapPin } from 'lucide-react';
import { useStates } from '@/hooks/use-states';

interface SavedAddress {
  id: string;
  phone: string;
  street: string;
  city: string;
  state: string;
  isDefault: boolean;
}

interface ShippingAddressProps extends ShippingAddressSchema {
  savedAddresses?: SavedAddress[];
  onSaveAddress?: (address: Omit<SavedAddress, 'id'>) => void;
  onSelectAddress?: (addressId: string) => void;
}

export function ShippingAddress({
  savedAddresses = [],
  onSaveAddress,
  onSelectAddress,
  ...data
}: ShippingAddressProps) {
  const { states } = useStates();
  const { control, handleSubmit, setValue } = useForm({
    resolver: zodResolver(shippingAddressSchema),
    defaultValues: {
      phone: data.phone || '',
      street: data.street || '',
      city: data.city || '',
      state: data.state || '',
      isDefault: data.isDefault || false,
    },
  });

  const onSubmit = (formData: ShippingAddressSchema) => {
    onSaveAddress?.(formData);
  };

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        const { latitude, longitude } = position.coords;
        try {
          const geocoder = new google.maps.Geocoder();
          const response = await geocoder.geocode({
            location: { lat: latitude, lng: longitude },
          });

          if (response.results[0]) {
            const address = response.results[0].formatted_address;
            // Extract city and state from address components
            const addressComponents = response.results[0].address_components;
            const city =
              addressComponents.find((c) => c.types.includes('locality'))?.long_name || '';
            const state =
              addressComponents.find((c) => c.types.includes('administrative_area_level_1'))
                ?.long_name || '';

            // Update form fields
            setValue('street', address);
            setValue('city', city);
            setValue('state', state);
          }
        } catch (error) {
          console.error('Error geocoding location:', error);
        }
      });
    }
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Saved Addresses List */}
      {savedAddresses.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Direcciones guardadas</h3>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {savedAddresses.map((address) => (
              <div
                key={address.id}
                className="p-4 border rounded-lg cursor-pointer hover:border-primary"
                onClick={() => onSelectAddress?.(address.id)}
              >
                <p className="font-medium">{address.street}</p>
                <p>
                  {address.city}, {address.state}
                </p>
                <p>{address.phone}</p>
                {address.isDefault && (
                  <span className="text-sm text-primary">Dirección predeterminada</span>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Address Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid gap-6 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <Controller
              control={control}
              name="phone"
              render={({ field, fieldState: { error } }) => (
                <LabeledInput
                  label="Teléfono"
                  inputProps={{
                    ...field,
                    type: 'tel',
                    placeholder: 'Ej: 0412 555 5555',
                  }}
                  labelProps={{
                    htmlFor: 'phone',
                  }}
                  error={error?.message}
                  helperText="Lo necesitamos para contactarte al hacer la entrega"
                />
              )}
            />
          </div>

          <div className="sm:col-span-2">
            <Controller
              control={control}
              name="street"
              render={({ field, fieldState: { error } }) => (
                <div className="space-y-2">
                  <LabeledInput
                    label="Dirección"
                    inputProps={{
                      ...field,
                      type: 'text',
                      placeholder: 'Nombre de la calle o avenida',
                    }}
                    labelProps={{
                      htmlFor: 'street',
                    }}
                    error={error?.message}
                  />
                  <button
                    type="button"
                    onClick={getCurrentLocation}
                    className="text-sm text-blue-600 hover:text-blue-500 flex items-center gap-1"
                  >
                    <MapPin size={16} />
                    Detectar ubicación actual
                  </button>
                </div>
              )}
            />
          </div>

          <div>
            <Controller
              control={control}
              name="city"
              render={({ field, fieldState: { error } }) => (
                <LabeledInput
                  label="Ciudad"
                  inputProps={{
                    ...field,
                    type: 'text',
                  }}
                  labelProps={{
                    htmlFor: 'city',
                  }}
                  error={error?.message}
                />
              )}
            />
          </div>

          <div>
            <Controller
              control={control}
              name="state"
              render={({ field, fieldState: { error } }) => (
                <div>
                  <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-1">
                    Estado/Provincia
                  </label>
                  <Select {...field} id="state">
                    <option value="">Selecciona un estado</option>
                    {states.map((state) => (
                      <option key={state.value} value={state.value}>
                        {state.label}
                      </option>
                    ))}
                  </Select>
                  {error && <p className="mt-1 text-sm text-red-600">{error.message}</p>}
                </div>
              )}
            />
          </div>

          <div className="sm:col-span-2 flex items-center gap-2">
            <Controller
              control={control}
              name="isDefault"
              render={({ field: { value, onChange } }) => (
                <>
                  <Checkbox id="isDefault" checked={value} onChange={onChange} />
                  <label htmlFor="isDefault" className="text-sm">
                    Guardar como dirección predeterminada
                  </label>
                </>
              )}
            />
          </div>

          <div className="sm:col-span-2 flex justify-start">
            <Button type="submit">Continuar al pago</Button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default ShippingAddress;
