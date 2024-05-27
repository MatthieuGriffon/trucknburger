'use client';
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
    <div className="preorder-menu flex flex-col items-center bg-[#D99153] text-justify p-4 xl:w-full xl:flex-row xl:justify-evenly">
      <div className="w-full max-w-md bg-[#D99153] flex flex-col text-center mb-8">
        <h1 className="text-xl mb-3">Pré-commander le {item.name}</h1>
        <p className="mb-2">{item.description}</p>
        <p className="mb-2">{item.price} €</p>
        <Image
          className="mx-auto mb-4" 
          src={item.image}
          alt={item.name}
          width={320}
          height={320}
        />
        <div className="flex justify-center items-center mb-4">
          <label htmlFor={`quantity-${id}`} className="mr-2">Quantité: </label>
          <input
            id={`quantity-${id}`}
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(Math.max(1, Number(e.target.value)))}
            min="1"
            className="w-16 text-black border rounded-md p-1 text-center"
          />
        </div>
        <button
          className="rounded-xl bg-orange-500 text-white px-4 py-2 hover:bg-orange-600"
          onClick={handleAddToCart}
        >
          Ajouter au panier
        </button>
      </div>
      <div className="w-full max-w-4xl flex flex-col items-center sm:grid-cols-2 md:w-full md:grid-cols-3 lg:w-full lg:grid-cols-1">
        <PreOrderMenu />
      </div>
    </div>
  );
};

export default PreOrderPage;
