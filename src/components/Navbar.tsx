'use client';
import React, { useState } from "react";
import Image from "next/image";

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="flex flex-col w-full sticky top-0 bg-[#eedfb5] z-50 transition-all duration-500">
      <nav className="flex items-center justify-between py-4 px-4 md:px-8">
        <Image
          className="m-0"
          priority
          src="/img/logo.png"
          width={120}
          height={120}
          alt="Logo TrucknBurger"
        />
        <button
          className="w-14 h-14 relative focus:outline-none bg-[#d99153] rounded md:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <div className="block w-5 absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <span
              className={`block absolute h-0.5 w-7 bg-white transform transition duration-500 ease-in-out ${
                isMenuOpen ? "rotate-45" : "-translate-y-1.5"
              }`}
            ></span>
            <span
              className={`block absolute h-0.5 w-5 bg-white transform transition duration-500 ease-in-out ${
                isMenuOpen ? "opacity-0" : ""
              }`}
            ></span>
            <span
              className={`block absolute h-0.5 w-7 bg-white transform transition duration-500 ease-in-out ${
                isMenuOpen ? "-rotate-45" : "translate-y-1.5"
              }`}
            ></span>
          </div>
        </button>
        <ul className="hidden md:flex md:flex-row md:items-center md:justify-evenly font-extrabold uppercase text-xl">
          <li className="m-2 md:m-4 lg:m-8 hover:text-[#d99153]">
            <a href="/#">Accueil</a>
          </li>
          <li className="m-2 md:m-4 lg:m-8 hover:text-[#d99153]">
            <a href="/#section1">Menu</a>
          </li>
          <li className="m-2 md:m-4 lg:m-8 hover:text-[#d99153]">
            <a href="/#section2">Calendrier</a>
          </li>
          <li className="m-2 md:m-4 lg:m-8 hover:text-[#d99153]">
            <a href="#">Actualités</a>
          </li>
          <li className="m-2 md:m-4 lg:m-8 hover:text-[#d99153]">
            <a href="#">Galerie</a>
          </li>
          <li className="m-2 md:m-4 lg:m-8 hover:text-[#d99153]">
            <a href="#">À Propos</a>
          </li>
          <li className="m-2 md:m-4 lg:m-8 hover:text-[#d99153]">
            <a href="#">Contact</a>
          </li>
          <li className="m-2 md:m-4 lg:m-8 hover:text-[#d99153]">
            <a href="/cart">Panier</a>
          </li>
        </ul>
      </nav>

      {isMenuOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-[#d99153] rounded-lg p-8">
            <ul className="flex flex-col items-center font-extrabold uppercase text-xl">
              <li className="m-2 hover:text-[#d99153]">
                <a href="/#" onClick={() => setIsMenuOpen(false)}>Accueil</a>
              </li>
              <li className="m-2 hover:text-[#d99153]">
                <a href="/#section1" onClick={() => setIsMenuOpen(false)}>Menu</a>
              </li>
              <li className="m-2 hover:text-[#d99153]">
                <a href="/#section2" onClick={() => setIsMenuOpen(false)}>Calendrier</a>
              </li>
              <li className="m-2 hover:text-[#d99153]">
                <a href="#" onClick={() => setIsMenuOpen(false)}>Actualités</a>
              </li>
              <li className="m-2 hover:text-[#d99153]">
                <a href="#" onClick={() => setIsMenuOpen(false)}>Galerie</a>
              </li>
              <li className="m-2 hover:text-[#d99153]">
                <a href="#" onClick={() => setIsMenuOpen(false)}>À Propos</a>
              </li>
              <li className="m-2 hover:text-[#d99153]">
                <a href="#" onClick={() => setIsMenuOpen(false)}>Contact</a>
              </li>
              <li className="m-2 hover:text-[#d99153]">
                <a href="/cart" onClick={() => setIsMenuOpen(false)}>Panier</a>
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;