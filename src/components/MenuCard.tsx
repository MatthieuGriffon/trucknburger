'use client';

import { useRouter } from "next/navigation";
import Image from "next/image";
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../app/store';
import { setItem } from  '../app/store/orderSlice';
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
    <div className="flex border rounded-lg overflow-hidden shadow-lg p-4 bg-[#d99153]">
      <div className="flex-shrink-0">
        <Image
          src={image}
          alt={name}
          className={`object-cover ${imageClassName}`}
          width={150}
          height={150}
        />
      </div>
      <div className="ml-4 flex-grow">
        <h2 className="text-xl font-bold">{name}</h2>
        <p className="text-gray-700">{description}</p>
        <p className="text-white font-semibold mb-2">{price} €</p>
        <div>
          <label htmlFor="quantity">Quantité: </label>
          <input 
            id="quantity"
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
            min="0"
            className="w-16 text-black border rounded-md p-1"
          />
        </div>
        <button
          className="flex justify-center w-[50%] m-auto mt-2 bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600"
          onClick={handlePreOrder}
        >
          Pré-commander
        </button>
      </div>
    </div>
  );
};

export default MenuCard;