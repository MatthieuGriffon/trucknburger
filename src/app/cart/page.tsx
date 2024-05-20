"use client";

import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../store";
import { removeItem, updateQuantity, updateDrink } from "../store/cartSlice";
import Image from "next/image";

const CartPage: React.FC = () => {
  const items = useSelector((state: RootState) => state.cart.items);
  const dispatch = useDispatch<AppDispatch>();

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

  if (items.length === 0) {
    return <div className="text-center py-10">Votre panier est vide.</div>;
  }

  return (
    <div className="bg-[#D99153] min-h-screen">
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4 text-center">Votre Panier</h1>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-[#eedfb5] border text-center">
            <thead>
              <tr>
                <th className="text-black py-2 px-4 border-b">Image</th>
                <th className="text-black py-2 px-4 border-b">Nom</th>
                <th className="text-black py-2 px-4 border-b">Description</th>
                <th className="text-black py-2 px-4 border-b">Prix</th>
                <th className="text-black py-2 px-4 border-b">Quantité</th>
                <th className="text-black py-2 px-4 border-b">Boisson</th>
                <th className="text-black py-2 px-4 border-b">Action</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item.id} className="hover:bg-gray-100">
                  <td className="py-2 px-4 border-b text-black">
                    <Image
                      src={item.image}
                      alt={item.name}
                      width={100}
                      height={100}
                    />
                  </td>
                  <td className="py-2 px-4 border-b text-black">{item.name}</td>
                  <td className="py-2 px-4 border-b text-black">
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
                      className="w-3/4 text-black border rounded"
                    >
                   
                      <option value="eau">Eau</option>
                      <option value="coca">Coca</option>
                      <option value="jus d&apos;orange">Jus d&apos;orange</option>
                      <option value="sprite">Sprite</option>
                      <option value="jus de pomme">Jus de pomme</option>
                    </select>
                  </td>
                  <td className="py-2 px-4 border-b text-black">
                    <button
                      className="bg-red-500 text-white py-1 px-3 rounded hover:bg-red-700"
                      onClick={() => handleRemoveItem(item.id)}
                    >
                      Supprimer
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
            <button
              className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-700"
              onClick={() => console.log('Valider le panier')}
            >
              Valider le panier
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
