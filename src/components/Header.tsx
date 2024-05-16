import React from "react";

const Header: React.FC = () => {
  return (
    <header className="bg-[#d99153] p-1 flex justify-between items-center ">
      <p className="text-sm flex-row-reverse">Bienvenue sur notre site ! 🍔 </p>
      <div className="marquee-container">
        <p className="ml-50 text-sm marquee-text">
          🚀 Promo actuelle : 5% de réduction sur tous les burgers ! 🍔
        </p>
      </div>

      <div className="flex flex-row ">
        <input
          type="text"
          placeholder="Recherche..."
          className="flex-row-reverse p-0.5 w-60 text-black text-xs bg-white rounded-lg focus:outline-none focus:shadow-outline"
        />
      </div>
    </header>
  );
};

export default Header;
