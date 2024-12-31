// components/ShippingAddress.tsx

import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { LabeledInput } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { ShippingAddressSchema, shippingAddressSchema } from '@/schemas/shipping-address-schema';
import { useStates } from '@/hooks/use-states';
import { MapPin } from 'lucide-react';
import { useState } from 'react';
import MapDialog from '@/components/address/MapDialog';

interface SavedAddress {
  id: string;
  phone: string;
  street: string;
  city: string;
  state: string;
  isDefault: boolean;
}

interface ShippingAddressProps extends Partial<ShippingAddressSchema> {
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
  const { control, handleSubmit, setValue } = useForm<ShippingAddressSchema>({
    resolver: zodResolver(shippingAddressSchema),
    defaultValues: {
      phone: data.phone || '',
      street: data.street || '',
      city: data.city || '',
      state: data.state || '',
      isDefault: data.isDefault || false,
      lat: data.lat,
      lng: data.lng,
    },
  });

  const { states } = useStates();
  const [isMapOpen, setIsMapOpen] = useState(false);

  const onSubmit = (formData: ShippingAddressSchema) => {
    const { lat, lng, ...rest } = formData;
    onSaveAddress?.(rest);
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
                    onClick={() => setIsMapOpen(true)}
                    className="text-sm text-blue-600 hover:text-blue-500 flex items-center gap-1"
                  >
                    <MapPin size={16} />
                    Usar ubicación
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

          <div className="sm:col-span-2 flex justify-end">
            <Button type="submit">Guardar dirección</Button>
          </div>
        </div>
      </form>

      <MapDialog
        open={isMapOpen}
        onClose={() => setIsMapOpen(false)}
        onLocationSelect={({ address, city, state, lat, lng }) => {
          setValue('street', address);
          if (city) setValue('city', city);
          if (state) setValue('state', state);
          setValue('lat', lat);
          setValue('lng', lng);
          setIsMapOpen(false);
        }}
      />
    </div>
  );
}

export default ShippingAddress;
