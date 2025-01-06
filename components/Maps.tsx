import { APIProvider, Map, Marker, MapMouseEvent } from '@vis.gl/react-google-maps';
import { useState, useCallback } from 'react';

interface MapsProps {
  onLocationSelect: (location: { address: string; lat: number; lng: number }) => void;
}

export default function Maps({ onLocationSelect }: MapsProps) {
  const [center, setCenter] = useState({ lat: 10.4806, lng: -66.9036 }); // Caracas
  const [markerPosition, setMarkerPosition] = useState(center);
  const GOOGLE_MAPS_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ?? '';

  const handleMapClick = useCallback(
    (e: MapMouseEvent) => {
      if (e.detail.latLng) {
        const lat = e.detail.latLng.lat;
        const lng = e.detail.latLng.lng;
        setMarkerPosition({ lat, lng });

        const geocoder = new window.google.maps.Geocoder();
        geocoder
          .geocode({ location: { lat, lng } })
          .then((response) => {
            if (response.results[0]) {
              onLocationSelect({
                address: response.results[0].formatted_address,
                lat,
                lng,
              });
            }
          })
          .catch((error) => console.error('Error geocoding location:', error));
      }
    },
    [onLocationSelect],
  );

  const getCurrentLocation = useCallback(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude;
          const lng = position.coords.longitude;
          setCenter({ lat, lng });
          setMarkerPosition({ lat, lng });

          const geocoder = new window.google.maps.Geocoder();
          geocoder
            .geocode({ location: { lat, lng } })
            .then((response) => {
              if (response.results[0]) {
                onLocationSelect({
                  address: response.results[0].formatted_address,
                  lat,
                  lng,
                });
              }
            })
            .catch((error) => console.error('Error geocoding location:', error));
        },
        (error) => console.error('Error getting current location:', error),
      );
    }
  }, [onLocationSelect]);

  return (
    <div className="w-full h-[400px] relative">
      <APIProvider apiKey={GOOGLE_MAPS_API_KEY}>
        <Map
          defaultZoom={15}
          center={center}
          mapId="bf51a910020fa25a"
          onClick={handleMapClick}
          className="w-full h-full"
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
  );
}
