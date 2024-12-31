// components/MapDialog.tsx

import { APIProvider, Map, Marker } from '@vis.gl/react-google-maps';
import { Dialog, DialogTitle, DialogBody, DialogActions } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import React, { useState, useCallback } from 'react';

interface MapDialogProps {
  open: boolean;
  onClose: () => void;
  onLocationSelect: (location: {
    address: string;
    city?: string;
    state?: string;
    lat: number;
    lng: number;
  }) => void;
}

export default function MapDialog({ open, onClose, onLocationSelect }: MapDialogProps) {
  const [center, setCenter] = useState({ lat: 10.4806, lng: -66.9036 }); // Caracas
  const [markerPosition, setMarkerPosition] = useState(center);
  const GOOGLE_MAPS_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ?? '';

  const handleMapClick = useCallback((e: any) => {
    const lat = e.detail.latLng.lat;
    const lng = e.detail.latLng.lng;
    setMarkerPosition({ lat, lng });
  }, []);

  const getCurrentLocation = useCallback(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude;
          const lng = position.coords.longitude;
          setCenter({ lat, lng });
          setMarkerPosition({ lat, lng });
        },
        (error) => console.error('Error getting location:', error),
      );
    }
  }, []);

  const handleConfirm = async () => {
    try {
      const geocoder = new google.maps.Geocoder();
      const response = await geocoder.geocode({
        location: { lat: markerPosition.lat, lng: markerPosition.lng },
      });

      if (response.results[0]) {
        const formattedAddress = response.results[0].formatted_address;
        const addressComponents = response.results[0].address_components;

        const city = addressComponents.find((c) => c.types.includes('locality'))?.long_name || '';
        const state =
          addressComponents.find((c) => c.types.includes('administrative_area_level_1'))
            ?.long_name || '';

        onLocationSelect({
          address: formattedAddress,
          city,
          state,
          lat: markerPosition.lat,
          lng: markerPosition.lng,
        });
        onClose();
      }
    } catch (error) {
      console.error('Error geocoding location:', error);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} size="4xl">
      <DialogTitle>Confirma tu ubicación</DialogTitle>
      <DialogBody>
        <div className="w-full h-[400px] relative">
          <APIProvider apiKey={GOOGLE_MAPS_API_KEY}>
            <Map
              defaultZoom={15}
              center={center}
              mapId="bf51a910020fa25a"
              onClick={handleMapClick}
              className="w-full h-full rounded-lg"
            >
              <Marker position={markerPosition} />
            </Map>
          </APIProvider>
          <button
            onClick={getCurrentLocation}
            className="absolute top-4 right-4 bg-white px-4 py-2 rounded-md shadow-md z-10 text-sm"
          >
            Detectar ubicación actual
          </button>
        </div>
      </DialogBody>

      <DialogActions>
        <Button plain onClick={onClose}>
          Cancelar
        </Button>
        <Button onClick={handleConfirm}>Confirmar</Button>
      </DialogActions>
    </Dialog>
  );
}
