'use client';
import React from "react";
import Image from "next/image";
import ImageCarousel from "./ImageCarrousel";

const Footer: React.FC = () => {
  return (
    <div className="flex flex-col w-full relative ">
      <div className="bg-[#eedfb5] flex items-center justify-evenly">
        <div className="container mx-auto my-8 flex">
          <ImageCarousel />
        </div>
      </div>
    </div>
  );
};

export default Footer;
