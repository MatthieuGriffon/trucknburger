'use client';

import React from "react";
import { FaCartArrowDown } from "react-icons/fa";
import { useSelector } from 'react-redux';
import { RootState } from '../app/store';

const Header: React.FC = () => {
  const items = useSelector((state: RootState) => state.cart.items);
  const itemsCount = items.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <header className="bg-[#d99153] p-2 flex flex-col sm:flex-row sm:justify-between sm:items-center">
      <p className="text-sm sm:text-xl sm:flex-row-reverse text-white">
        Bienvenue sur notre site ! 🍔
      </p>
      <div className="marquee-container mt-2 sm:mt-0">
        <p className="text-xs sm:text-sm ml-0 sm:ml-50 marquee-text">
          🚀 Promo actuelle : 5% de réduction sur tous les burgers ! 🍔
        </p>
      </div>
      <div className="flex items-center mt-2 sm:mt-0">
        <a href="/cart" className="text-sm sm:text-xl flex items-center">
          <FaCartArrowDown className="mr-2" /> Votre panier contient {itemsCount} articles
        </a>
      </div>
    </header>
  );
};

export default Header;
