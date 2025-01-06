import React, { useEffect, useRef } from 'react';
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
  value,
  error,
  className,
  ...props
}: AddressAutocompleteProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const autocompleteRef = useRef<google.maps.places.Autocomplete | null>(null);

  useEffect(() => {
    if (!inputRef.current || !window.google) return;

    // Initialize the autocomplete instance
    autocompleteRef.current = new google.maps.places.Autocomplete(inputRef.current, {
      componentRestrictions: { country: 'VE' },
      fields: ['formatted_address', 'geometry', 'address_components'],
    });

    // Add place_changed event listener
    const listener = autocompleteRef.current.addListener('place_changed', () => {
      const place = autocompleteRef.current?.getPlace();

      if (!place?.geometry?.location) return;

      const city = place.address_components?.find((component) =>
        component.types.includes('locality'),
      )?.long_name;

      const state = place.address_components?.find((component) =>
        component.types.includes('administrative_area_level_1'),
      )?.long_name;

      onPlaceSelect({
        address: place.formatted_address || '',
        city,
        state,
        lat: place.geometry.location.lat(),
        lng: place.geometry.location.lng(),
      });
    });

    return () => {
      // Cleanup listener when component unmounts
      google.maps.event.removeListener(listener);
    };
  }, [onPlaceSelect]);

  return (
    <div className="relative">
      <Input ref={inputRef} value={value} className={className} {...props} />
      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  );
}
