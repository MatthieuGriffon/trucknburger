"use client";
import "../../globals.css";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../../store";
import { addItem } from "../../store/cartSlice";
import Image from "next/image";
import PreOrderMenu from "../../../components/PreOrderMenu";
import { toast } from 'react-toastify';

const PreOrderPage = ({ params }: { params: { id: string } }) => {
  const { id } = params;
  const item = useSelector((state: RootState) => state.order.item);
  const dispatch = useDispatch<AppDispatch>();
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
      dispatch(
        addItem({
          id: item.id,
          name: item.name,
          description: item.description,
          price: item.price,
          quantity,
          image: item.image,
        })
      );
      toast.success(`${quantity} ${item.name} a été ajouté au panier!`);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!item) {
    return <div>Menu not found</div>;
  }

  return (
    <div className="preorder-menu flex flex-row w-auto flex-wrap justify-center bg-[#D99153] text-justify">
      <div className="w-1/3 m-5 bg-[#D99153] flex flex-col text-center">
        <h1 className="text-xl mb-3">Pré-commander le {item.name}</h1>
        <p className="mb-2">{item.description}</p>
        <p className="mb-2">{item.price} €</p>
        <Image
          className="flex w-80 h-80 mx-auto" 
          src={item.image}
          alt={item.name}
          width={120}
          height={120}
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
      <div className="w-1/2  flex flex-col-reverse justify-between items-baseline flex-wrap text-xs text-center custom-preorder-menu-container">
        <PreOrderMenu />
      </div>
    </div>
  );
};

export default PreOrderPage;
