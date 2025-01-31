// components/ShippingAddress.tsx

import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { LabeledInput } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { ShippingAddressSchema, shippingAddressSchema } from '@/schemas/shipping-address-schema';
import { useStates } from '@/hooks/use-states';
import { Loader2, MapPin } from 'lucide-react';
import { useState } from 'react';
import MapDialog from '@/components/address/MapDialog';
import AddressAutocomplete from '@/components/address/Autocomplete';
import { Radio, RadioGroup } from '@/components/ui/radio';
import { EllipsisVerticalIcon } from '@heroicons/react/24/outline';
import { PlusIcon } from '@heroicons/react/24/outline';
import useAddress from '@/hooks/use-address';
interface SavedAddress {
  id: string;
  phone: string;
  street: string;
  city: string;
  state: string;
  isDefault: boolean;
  alias: string;
}

interface ShippingAddressProps extends Partial<ShippingAddressSchema> {
  savedAddresses?: SavedAddress[];
  onSaveAddress?: (address: Omit<SavedAddress, 'id'>) => void;
  onSelectAddress?: (addressId: string) => void;
  shippingAddressId: string;
}

export function ShippingAddress({
  savedAddresses = [],
  onSaveAddress,
  onSelectAddress,
  shippingAddressId,
  ...data
}: ShippingAddressProps) {
  const { useCreateAddress } = useAddress();
  const { mutateAsync: createAddress, isPending: isCreatingAddress } = useCreateAddress();
  const { states } = useStates();

  const [isMapOpen, setIsMapOpen] = useState(false);
  const [showNewAddress, setShowNewAddress] = useState(savedAddresses.length > 0);
  const [selectedAddressId, setSelectedAddressId] = useState(() => {
    if (shippingAddressId) {
      const newAddress = savedAddresses.find((address) => address.id === shippingAddressId);
      return newAddress ? shippingAddressId : savedAddresses[0].id;
    } else {
      return savedAddresses[0]?.id;
    }
  });

  const findStateMatch = (stateName: string) => {
    return states.find(
      (state) =>
        state.label.toLowerCase().includes(stateName.toLowerCase()) ||
        stateName.toLowerCase().includes(state.label.toLowerCase()),
    );
  };

  const { control, handleSubmit, setValue, watch } = useForm<ShippingAddressSchema>({
    resolver: zodResolver(shippingAddressSchema),
    defaultValues: {
      phone: data.phone || '',
      street: data.street || '',
      city: data.city || '',
      state: data.state || '',
      isDefault: data.isDefault || false,
      lat: data.lat,
      lng: data.lng,
      alias: data.alias || '',
    },
  });

  const onSubmit = async (formData: ShippingAddressSchema) => {
    const { lat, lng, ...rest } = formData;
    const addressData = {
      ...rest,
      house: 'Mi casa',
      position: { lat: formData.lat!, lng: formData.lng! },
      zone: 'La Zona',
      default: formData.isDefault,
      alias: formData.alias || 'Alias',
    };

    try {
      const response = (await createAddress({ addressData })) as {
        data: { addressId: string; addressData: Omit<SavedAddress, 'id'> };
      };
      onSaveAddress && onSaveAddress(response?.data?.addressData);
    } catch (error) {
      console.error(error);
    }
  };

  const handleNext = () => {
    const newAddress = savedAddresses.find((address) => address.id === selectedAddressId);
    onSaveAddress && onSaveAddress(newAddress || savedAddresses[0]);
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Saved Addresses List */}
      {showNewAddress ? (
        <div className="space-y-4">
          <RadioGroup value={selectedAddressId} onChange={setSelectedAddressId}>
            <div className="grid gap-4">
              {savedAddresses.map((address) => (
                <div
                  key={address.id}
                  className={`${selectedAddressId === address.id ? 'border-primary' : ''} p-4 border rounded-lg cursor-pointer hover:border-primary`}
                  onClick={() => setSelectedAddressId(address.id)}
                >
                  <div className="flex items-center gap-4 justify-between">
                    <div className="flex items-start gap-4">
                      <Radio
                        value={address.id}
                        className="cursor-pointer rounded-lg  border-gray-300 p-1 focus:outline-hidden data-focus:ring-2 data-focus:ring-indigo-500"
                      />
                      <div className="mt-1">
                        <p className="font-bold">{address.alias}</p>
                        <p>
                          {address.city}, {address.state}
                        </p>
                        <p>{address.phone}</p>
                        {address.isDefault && (
                          <span className="text-sm text-primary">Dirección predeterminada</span>
                        )}
                      </div>
                    </div>
                    <EllipsisVerticalIcon className="size-8" />
                  </div>
                </div>
              ))}
            </div>
          </RadioGroup>
          <div
            className="flex items-center gap-1 cursor-pointer"
            onClick={() => setShowNewAddress(false)}
          >
            <PlusIcon className="size-5" />
            <span className="text-primary font-medium">Usar una dirección diferente</span>
          </div>
          <Button onClick={handleNext} className="cursor-pointer">
            Entregar a esta dirección
          </Button>
        </div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <Controller
                control={control}
                name="alias"
                render={({ field, fieldState: { error } }) => (
                  <LabeledInput
                    label="Alias"
                    inputProps={{
                      ...field,
                      type: 'text',
                      placeholder: 'Ej: Mi casa',
                    }}
                    labelProps={{
                      htmlFor: 'alias',
                    }}
                    error={error?.message}
                  />
                )}
              />
            </div>
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
                render={({ field: { onChange, value }, fieldState: { error } }) => (
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">Dirección</label>
                    <AddressAutocomplete
                      value={value}
                      onChange={onChange}
                      onPlaceSelect={({ address, city, state, lat, lng }) => {
                        setValue('street', address);
                        if (city) setValue('city', city);
                        if (state) {
                          const stateMatch = findStateMatch(state);
                          if (stateMatch) {
                            setValue('state', stateMatch.value);
                          }
                        }
                        setValue('lat', lat);
                        setValue('lng', lng);
                      }}
                      placeholder="Nombre de la calle o avenida"
                      error={error?.message}
                    />
                    <button
                      type="button"
                      onClick={() => setIsMapOpen(true)}
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
                    {error && <p className="mt-1 text-sm text-red-400">{error.message}</p>}
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
                      Guardar como dirección por defecto
                    </label>
                  </>
                )}
              />
            </div>

            <div className="sm:col-span-2 flex justify-start gap-2">
              <Button type="submit" disabled={isCreatingAddress}>
                {isCreatingAddress ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Continuar'}
              </Button>
              {savedAddresses.length > 0 && (
                <Button color="white" onClick={() => setShowNewAddress(true)}>
                  Cancelar
                </Button>
              )}
            </div>
          </div>
        </form>
      )}

      {/* Address Form */}

      <MapDialog
        open={isMapOpen}
        onClose={() => setIsMapOpen(false)}
        onLocationSelect={({ address, city, state, lat, lng }) => {
          setValue('street', address);
          if (city) setValue('city', city);
          if (state) {
            const stateMatch = findStateMatch(state);
            if (stateMatch) {
              setValue('state', stateMatch.value);
            }
          }
          setValue('lat', lat);
          setValue('lng', lng);
          setIsMapOpen(false);
        }}
      />
    </div>
  );
}

export default ShippingAddress;
