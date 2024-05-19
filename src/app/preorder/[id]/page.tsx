"use client";

import { useEffect, useState } from "react";
import { useOrder } from "../../context/OrderContext";
import { useCartDispatch } from "../../context/CartContext";
import Image from "next/image";
import PreOrderMenu from "../../../components/PreOrderMenu";

const PreOrderPage = ({ params }: { params: { id: string } }) => {
  const { id } = params;
  const { item } = useOrder();
  const cartDispatch = useCartDispatch();
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (id) {
      setLoading(false);
    }
  }, [id]);

  const handleAddToCart = () => {
    if (item) {
      console.log("Adding item to cart:", item);
      cartDispatch({
        type: "ADD_ITEM",
        item: {
          id: item.id,
          name: item.name,
          description: item.description,
          price: item.price,
          quantity,
          image: item.image,
        },
      });
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!item) {
    return <div>Menu not found</div>;
  }

  return (
    <div className="flex flex-row w-auto flex-wrap justify-center bg-[#D99153] text-justify">
      <div className="w-1/3 m-5 bg-[#D99153] flex flex-col text-center">
        <h1 className="text-xl mb-3">Pré-commander le {item.name}</h1>
        <p className="mb-2">{item.description}</p>
        <p className="mb-2">{item.price} €</p>
        <Image
          className="flex w-full"
          src={item.image}
          alt={item.name}
          width={200}
          height={200}
        />
        <div>
          <label htmlFor={`quantity-${id}`}>Quantité: </label>
          <input
            id={`quantity-${id}`}
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(Math.max(1, Number(e.target.value)))}
            min="1"
            className="w-16 text-black border rounded-md p-1"
          />
        </div>
        <button
          className="mt-3 rounded-xl bg-orange-500 text-white px-4 py-2 hover:bg-orange-600"
          onClick={handleAddToCart}
        >
          Ajouter au panier
        </button>
      </div>
      <div className="w-1/2 m-5 flex flex-row text-xs">
        <PreOrderMenu />
      </div>
    </div>
  );
};

export default PreOrderPage;