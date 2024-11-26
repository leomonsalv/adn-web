"use client";

import { APIProvider, Map } from "@vis.gl/react-google-maps";

export default function Maps() {
  const GOOGLE_MAPS_API_KEY =
    process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ?? "api_key";

  return (
    <div className="w-[540px] h-80">
      <APIProvider
        apiKey={GOOGLE_MAPS_API_KEY}
        onError={(e) =>
          console.error("Error occured while loading Maps API: ", e)
        }
      >
        <Map
          mapId={"bf51a910020fa25a"}
          defaultZoom={5}
          defaultCenter={{ lat: 53, lng: 10 }}
          gestureHandling={"greedy"}
          disableDefaultUI={true}
        />
      </APIProvider>
    </div>
  );
}
