'use client';

import { useRouter } from "next/navigation";
import Image from "next/image";
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../app/store';
import { setItem } from '../app/store/orderSlice';
import { useState } from "react";

interface MenuCardProps {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  imageClassName?: string;
}

const MenuCard: React.FC<MenuCardProps> = ({
  id,
  name,
  description,
  price,
  image,
  imageClassName,
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const [quantity, setQuantity] = useState(0);
  const router = useRouter();

  const handlePreOrder = () => {
    dispatch(setItem({
      id,
      name,
      description,
      price,
      image,
      quantity,
    }));
    router.push(`/preorder/id=${id}`);
  };

  return (
    <div className="flex flex-col sm:flex-row border rounded-lg overflow-hidden shadow-lg p-4 bg-[#d99153]">
      <div className="flex-shrink-0 mb-4 sm:mb-0 sm:mr-4">
        <Image
          src={image}
          alt={name}
          className={`object-cover ${imageClassName}`}
          width={150}
          height={150}
        />
      </div>
      <div className="flex-grow">
        <h2 className="text-lg sm:text-xl font-bold">{name}</h2>
        <p className="text-gray-700">{description}</p>
        <p className="text-white font-semibold mb-2">{price} €</p>
        
        <button
          className="mt-2 w-full sm:w-auto bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600"
          onClick={handlePreOrder}
        >
          Pré-commander
        </button>
      </div>
    </div>
  );
};

export default MenuCard;
