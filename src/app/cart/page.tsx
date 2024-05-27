'use client';

import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../store";
import { removeItem, updateQuantity, updateDrink } from "../store/cartSlice";
import Image from "next/image";
import LoginModal from "../../components/LoginModal";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

interface Location {
  id: number;
  day: string;
  lat: number;
  lng: number;
  time: string;
  address: string;
  city: string;
}

const CartPage: React.FC = () => {
  const items = useSelector((state: RootState) => state.cart.items);
  const dispatch = useDispatch<AppDispatch>();
  const { data: session } = useSession();
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [locations, setLocations] = useState<Location[]>([]);
  const [selectedLocation, setSelectedLocation] = useState<string>("");
  const router = useRouter();

  async function getCityName(lat: number, lng: number) {
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`
    );
    const data = await response.json();
    const addressComponents = data.results[0].address_components;
    const cityComponent = addressComponents.find(
      (component: { types: string | string[] }) =>
        component.types.includes("locality")
    );
    return cityComponent ? cityComponent.long_name : "Unknown city";
  }

  useEffect(() => {
    fetch("/api/locations")
      .then((response) => response.json())
      .then(async (data) => {
        const locationsWithCityNames = await Promise.all(
          data.map(async (location: Location) => {
            const city = await getCityName(location.lat, location.lng);
            return { ...location, city };
          })
        );
        setLocations(locationsWithCityNames);
      });
  }, []);

  const handleRemoveItem = (id: string) => {
    dispatch(removeItem(id));
  };

  const handleQuantityChange = (id: string, quantity: number) => {
    if (quantity >= 0) {
      dispatch(updateQuantity({ id, quantity }));
    }
  };

  const handleDrinkChange = (id: string, drink: string) => {
    dispatch(updateDrink({ id, drink }));
  };

  const calculateTotal = () => {
    return items
      .reduce((total, item) => total + item.price * item.quantity, 0)
      .toFixed(2);
  };

  const handleValidateCart = () => {
    if (!session) {
      setIsLoginModalOpen(true);
    } else {
      const orderData = {
        items,
        location: selectedLocation,
      };
      localStorage.setItem("currentOrder", JSON.stringify(orderData));
      router.push("/profile");
    }
  };

  if (items.length === 0) {
    return <div className="text-center py-10 text-xs">Votre panier est vide.</div>;
  }

  return (
    <div className="bg-[#D99153] min-h-screen text-xs">
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4 text-center text-xs">Votre Panier</h1>
        <div className="overflow-x-auto text-xs">
          <table className="min-w-full bg-[#eedfb5] border text-center">
            <thead>
              <tr>
                <th className="text-black py-2 px-4 border-b hidden md:table-cell">Image</th>
                <th className="text-black py-2 px-4 border-b">Nom</th>
                <th className="text-black py-2 px-4 border-b hidden md:table-cell">Description</th>
                <th className="text-black py-2 px-4 border-b">Prix</th>
                <th className="text-black py-2 px-4 border-b">Quantité</th>
                <th className="text-black py-2 px-4 border-b">Boisson</th>
                <th className="text-black py-1 px-2 border-b">Action</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item.id} className="hover:bg-gray-100">
                  <td className="py-2 px-4 border-b text-black hidden md:table-cell">
                    <Image
                      src={item.image}
                      alt={item.name}
                      width={100}
                      height={100}
                      className="object-cover"
                    />
                  </td>
                  <td className="py-2 px-4 border-b text-black">{item.name}</td>
                  <td className="py-2 px-4 border-b text-black hidden md:table-cell">
                    {item.description}
                  </td>
                  <td className="py-2 px-4 border-b text-black">
                    {item.price} €
                  </td>
                  <td className="py-2 px-4 border-b text-black">
                    <input
                      type="number"
                      value={item.quantity}
                      onChange={(e) =>
                        handleQuantityChange(item.id, Number(e.target.value))
                      }
                      min="0"
                      className="w-16 text-center border rounded"
                    />
                  </td>
                  <td className="py-2 px-4 border-b text-black text-center">
                    <select
                      value={item.drink || ""}
                      onChange={(e) =>
                        handleDrinkChange(item.id, e.target.value)
                      }
                      className="w-full text-black border rounded"
                    >
                      <option value="">Choisissez une boisson</option>
                      <option value="eau">Eau</option>
                      <option value="coca">Coca</option>
                      <option value="jus d'orange">Jus d&apos;orange</option>
                      <option value="sprite">Sprite</option>
                      <option value="jus de pomme">Jus de pomme</option>
                    </select>
                  </td>
                  <td className="py-2 px-4 border-b text-black">
                    <button
                      className="bg-red-500 text-white py-1 px-3 rounded hover:bg-red-700"
                      onClick={() => handleRemoveItem(item.id)}
                    >
                      x
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="mt-4 text-right">
            <h2 className="text-xl font-bold">Total: {calculateTotal()} €</h2>
          </div>
          <div className="mt-4 text-right">
            <label className="block text-lg font-bold mb-2 text-black">
              Sélectionnez votre emplacement
            </label>
            <select
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value)}
              className="w-full text-black border rounded mb-4"
            >
              <option value="">Choisissez un emplacement</option>
              {locations.map((location) => (
                <option className="text-black" key={location.id} value={location.id}>
                  {location.day} : {location.city}
                </option>
              ))}
            </select>
          </div>
          <div className="mt-4 text-right">
            <button
              className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-700"
              onClick={handleValidateCart}
            >
              Valider le panier
            </button>
          </div>
        </div>
        {isLoginModalOpen && (
          <LoginModal onClose={() => setIsLoginModalOpen(false)} />
        )}
      </div>
    </div>
  );
};

export default CartPage;