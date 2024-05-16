import React from 'react';
import Image from 'next/image';

interface MenuCardProps {
  title: string;
  description: string;
  price: string;
  image: string;
  imageClassName?: string;
}

const MenuCard: React.FC<MenuCardProps> = ({ title, description, price, image, imageClassName }) => {
  return (
    <div className="flex border rounded-lg overflow-hidden shadow-lg p-4 bg-[#d99153]">
      <div className="flex-shrink-0">
        <Image 
          src={image} 
          alt={title} 
          className={`object-cover ${imageClassName}`} 
          width={150} // Ajustez la largeur selon vos besoins
          height={150} // Ajustez la hauteur selon vos besoins
        />
      </div>
      <div className="ml-4 flex-grow">
        <h2 className="text-xl font-bold">{title}</h2>
        <p className="text-gray-700">{description}</p>
        <p className="text-white font-semibold mb-2">{price}</p>
        <button className="flex justify-center w-[50%] m-auto mt-2 bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600">
          Pré-commander
        </button>
      </div>
    </div>
  );
};





export default MenuCard;