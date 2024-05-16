import React from "react";
import Image from "next/image";

const Navbar: React.FC = () => {
  return (
    <div className="flex flex-col w-full relative ">
      <nav className="bg-[#eedfb5] flex items-center justify-evenly">
        <Image
            className="m-0"
            priority
            src="/img/logo.png"
            width={120}
            height={120}
            alt="Logo TrucknBurger"
        />
        <ul className="flex flex-row flex-wrap font-extrabold text-2xl items-center text-black uppercase">
          <li className="m-8 hover:text-[#d99153]">
            <a href="#">Accueil</a>
          </li>
          <li className="m-8 hover:text-[#d99153]">
            <a href="#">Menu</a>
          </li>
          <li className="m-8 hover:text-[#d99153]">
            <a href="#">Calendrier</a>
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
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
