import React, { useEffect, useRef, useState } from 'react';
import { Input } from '@/components/ui/input';

interface AddressAutocompleteProps extends React.ComponentPropsWithoutRef<typeof Input> {
  onPlaceSelect: (place: {
    address: string;
    city?: string;
    state?: string;
    lat: number;
    lng: number;
  }) => void;
  value?: string;
  error?: string;
}

export default function AddressAutocomplete({
  onPlaceSelect,
  value: propValue,
  error,
  className,
  ...props
}: AddressAutocompleteProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const autocompleteRef = useRef<google.maps.places.Autocomplete | null>(null);
  const [inputValue, setInputValue] = useState(propValue || '');

  useEffect(() => {
    if (!inputRef.current) {
      return;
    }

    if (!window.google) {
      return;
    }

    if (!autocompleteRef.current) {
      autocompleteRef.current = new google.maps.places.Autocomplete(inputRef.current, {
        componentRestrictions: { country: 'VE' },
        fields: ['formatted_address', 'geometry', 'address_components'],
      });
    }

    const handlePlaceChanged = () => {
      const place = autocompleteRef.current?.getPlace();

      if (!place) {
        return;
      }

      if (!place.geometry?.location) {
        return;
      }

      const city = place.address_components?.find((component) =>
        component.types.includes('locality'),
      )?.long_name;

      const state = place.address_components?.find((component) =>
        component.types.includes('administrative_area_level_1'),
      )?.long_name;

      // Llamar al callback con los datos seleccionados
      onPlaceSelect({
        address: place.formatted_address || '',
        city,
        state,
        lat: place.geometry.location.lat(),
        lng: place.geometry.location.lng(),
      });

      // Actualizar el valor local del input con la dirección seleccionada
      setInputValue(place.formatted_address || '');
    };

    // Registrar el listener en el evento place_changed
    const listener = autocompleteRef.current.addListener('place_changed', handlePlaceChanged);

    return () => {
      if (listener) google.maps.event.removeListener(listener);
    };
  }, [onPlaceSelect]);

  // Sincronizar el valor externo (propValue) con el estado interno
  useEffect(() => {
    if (propValue !== undefined) {
      setInputValue(propValue);
    }
  }, [propValue]);

  return (
    <div className="relative">
      <Input
        ref={inputRef}
        value={inputValue} // Usamos el estado local
        onChange={(e) => setInputValue(e.target.value)} // Actualizamos el estado local al escribir
        className={className}
        {...props}
      />
      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  );
}
