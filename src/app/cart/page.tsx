'use client';

import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../store";
import { removeItem } from "../store/cartSlice";
import Image from "next/image";

const CartPage: React.FC = () => {
  const items = useSelector((state: RootState) => state.cart.items);
  console.log("items du page.tsx", items);
  const dispatch = useDispatch<AppDispatch>();

  const handleRemoveItem = (id: string) => {
    dispatch(removeItem(id));
  };

  if (items.length === 0) {
    return <div>Votre panier est vide.</div>;
  }

  return (
    <div>
      <h1>Votre Panier</h1>
      <ul>
        {items.map((item) => (
          <li
            key={item.id}
            className="flex flex-row justify-between items-center p-4 border-b"
          >
            <div className="flex flex-col">
              <h2>{item.name}</h2>
              <p>{item.description}</p>
              <p>{item.price} €</p>
              <p>Quantité: {item.quantity}</p>
            </div>
            <Image src={item.image} alt={item.name} width={100} height={100} />
            <button onClick={() => handleRemoveItem(item.id)}>Supprimer</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CartPage;