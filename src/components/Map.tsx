"use client";
import React, { ReactNode } from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import { useEffect, useState } from "react";

const containerStyle = {
  width: "100%",
  height: "400px",
};

const center = {
  lat: 47.34154,
  lng: -1.528567,
};

type Location = {
  city: ReactNode;
  day: string;
  id: number;
  lat: number;
  lng: number;
  time: string;
};

const Map: React.FC = () => {
  const [locations, setLocations] = useState<Location[]>([]);

  useEffect(() => {
    fetch("/api/locations")
      .then((response) => response.json())
      .then(async (data) => {
        const locationsWithCityNames = await Promise.all(
          data.map(async (location: { lat: any; lng: any }) => {
            const city = await getCityName(location.lat, location.lng);
            return { ...location, city};
          })
        );
        setLocations(locationsWithCityNames);
      });
  }, []);

  async function getCityName(lat: any, lng: any) {
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`
    );
    const data = await response.json();
    const addressComponents = data.results[0].address_components;
    const city = addressComponents.find(
      (component: { types: string | string[] }) =>
        component.types.includes("locality")
    ).long_name;
    return city;
  }

  return (
    <div className="flex flex-col md:flex-row w-full p-4">
      <div className="w-full md:w-1/2 p-3 mb-4 md:mb-0 shadow-2xl">
        <LoadScript
          googleMapsApiKey={
            process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "YOUR_API_KEY"
          }
        >
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={10}
          >
            {locations.map((location) => (
              <Marker
                key={location.id}
                position={{ lat: location.lat, lng: location.lng }}
              />
            ))}
          </GoogleMap>
        </LoadScript>
      </div>

      <div className="w-full md:w-1/2 bg-[#d99153] rounded-xl p-6 shadow-xl">
        <h1 className="text-3xl md:text-4xl text-white font-bold mb-4">
          Le Truck Burger sera bientôt dans votre ville!
        </h1>
        <ul className="text-lg md:text-2xl text-white space-y-4">
          {locations.map((location) => (
            <li className="bg-black bg-opacity-20 rounded p-3" key={location.id}>
              {location.day} : {location.city}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Map;