"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div
      className={`flex flex-col w-full ${
        isScrolled ? "sticky top-0 bg-white/10 z-50 text-white/80" : "relative"
      } transition-all duration-500`}
    >
      <nav
        className={`flex items-center justify-evenly ${
          isScrolled ? "bg-white/0 py-2" : "bg-[#eedfb5] py-4"
        }`}
      >
        {!isScrolled && (
          <Image
            className="m-0"
            priority
            src="/img/logo.png"
            width={120}
            height={120}
            alt="Logo TrucknBurger"
          />
        )}
        <ul
          className={`flex flex-row flex-wrap font-extrabold items-center uppercase ${
            isScrolled ? "text-xl" : "text-2xl"
          } transition-all duration-600`}
        >
          <li className="m-8 hover:text-[#d99153]">
            <a href="/#">Accueil</a>
          </li>
          <li className="m-8 hover:text-[#d99153]">
            <a href="/#section1">Menu</a>
          </li>
          <li className="m-8 hover:text-[#d99153]">
            <a href="/#section2">Calendrier</a>
          </li>
          <li className="m-8 hover:text-[#d99153]">
            <a href="#">Actualités</a>
          </li>
          <li className="m-8 hover:text-[#d99153]">
            <a href="#">Galerie</a>
          </li>
          <li className="m-8 hover:text-[#d99153]">
            <a href="#">À Propos</a>
          </li>
          <li className="m-8 hover:text-[#d99153]">
            <a href="#">Contact</a>
          </li>
          <li className="m-8 hover:text-[#d99153]">
            <a href="/cart">Panier</a>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
