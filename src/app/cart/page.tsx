'use client';

import { useCart } from '../context/CartContext';
import Image from 'next/image';

const CartPage = () => {
  const { items } = useCart();

  console.log('Items in cart:', items);

  if (items.length === 0) {
    return <div>Votre panier est vide.</div>;
  }

  return (
    <div>
      <h1>Votre Panier</h1>
      <ul>
        {items.map(item => (
          <li key={item.id} className="flex flex-row justify-between items-center p-4 border-b">
            <div className="flex flex-col">
              <h2>{item.name}</h2>
              <p>{item.description}</p>
              <p>{item.price} €</p>
              <p>Quantité: {item.quantity}</p>
            </div>
            <Image
              src={item.image}
              alt={item.name}
              width={100}
              height={100}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CartPage;
