'use client';

import React from "react";
import { FaCartArrowDown } from "react-icons/fa";
import { useSelector } from 'react-redux';
import { RootState } from '../app/store';

const Header: React.FC = () => {
  const items = useSelector((state: RootState) => state.cart.items);
  const itemsCount = items.reduce((acc, item) => acc + item.quantity, 0);
  
  return (
    <header className="bg-[#d99153] p-1 flex justify-between items-center">
      <p className="text-xl flex-row-reverse">Bienvenue sur notre site ! 🍔</p>
      <div className="marquee-container">
        <p className="ml-50 text-sm marquee-text">
          🚀 Promo actuelle : 5% de réduction sur tous les burgers ! 🍔
        </p>
      </div>
      <div className="flex items-center">
        <a href="/cart" className="text-xl flex items-center m-5">
          <FaCartArrowDown className="mr-2" /> Votre panier contient {itemsCount} articles
        </a>
      </div>
    </header>
  );
};

export default Header;
