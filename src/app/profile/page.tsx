"use client";

import { useSession, signOut } from "next-auth/react";
import React, { useEffect, useState } from "react";
import { addHours } from "date-fns";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../app/store";
import { clearCart } from "../../app/store/cartSlice";
import { Order, OrderItem } from "../../../types/types";

const ProfilePage: React.FC = () => {
  const { data: session, status } = useSession();
  const dispatch = useDispatch<AppDispatch>();
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const [orders, setOrders] = useState<Order[]>([]);
  const [currentOrder, setCurrentOrder] = useState<Order | null>(null);

  useEffect(() => {
    if (session?.user?.id) {
      fetchOrders(session.user.id);
    }

    const savedOrder = localStorage.getItem("currentOrder");
    if (savedOrder) {
      setCurrentOrder(JSON.parse(savedOrder));
    }
  }, [session]);

  const fetchOrders = async (userId: string) => {
    const response = await fetch(`/api/orders?userId=${userId}`);
    if (response.ok) {
      const data: Order[] = await response.json();
      setOrders(data);
    } else {
      console.error("Failed to fetch orders");
    }
  };

  const handlePayment = async () => {
    if (!session?.user || !currentOrder) {
      return;
    }

    const orderData = {
      userId: session?.user?.id,
      status: "paid",
      totalPrice: currentOrder.items.reduce(
        (total, item) => total + item.price * item.quantity,
        0
      ),
      items: currentOrder.items.map((item) => ({
        menuItemId: item.id,
        quantity: item.quantity,
        price: item.price,
      })),
    };

    const response = await fetch("/api/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(orderData),
    });

    if (response.ok) {
      console.log("Order created successfully");
      dispatch(clearCart());
      localStorage.removeItem("currentOrder");
      if (session?.user?.id) {
        fetchOrders(session.user.id); // Fetch orders again to update the list
      }
    } else {
      console.error("Failed to create order");
    }
  };

  if (status === "loading") {
    return <div className="text-center py-10">Loading...</div>;
  }

  if (!session) {
    return (
      <div className="text-center py-10">Vous n&apos;êtes pas connecté.</div>
    );
  }

  const updatedAt = session.user?.updated_at;

  const timeZoneOffset = 2;
  const formattedDate = updatedAt
    ? new Date(addHours(new Date(updatedAt), timeZoneOffset)).toLocaleString(
        "fr-FR",
        { timeZone: "Europe/Paris" }
      )
    : "N/A";

  return (
    <div className="min-h-screen bg-gray-100 py-10">
      <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-lg text-zinc-950">
        <h1 className="text-3xl font-bold mb-4">
          Profil de l&apos;utilisateur
        </h1>
        <div className="mb-4">
          <p className="text-lg">
            <strong>Nom:</strong> {session.user?.name}
          </p>
          <p className="text-lg">
            <strong>Email:</strong> {session.user?.email}
          </p>
          <p className="text-lg">
            <strong>Dernière connexion le :</strong>
            {formattedDate}
          </p>
        </div>
        <div className="flex justify-between items-center mt-6">
          <button
            onClick={() => signOut()}
            className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-700"
          >
            Se déconnecter
          </button>
          {currentOrder && (
            <button
              onClick={handlePayment}
              className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-700"
            >
              Passer au paiement
            </button>
          )}
        </div>
        {currentOrder && (
          <div className="mt-10">
            <h2 className="text-2xl font-bold mb-4">Commande en cours</h2>
            <ul>
              {currentOrder.items.map((item, index) => (
                <li key={index} className="mb-2">
                  {item.quantity} x {item.name} @ {item.price} €
                </li>
              ))}
            </ul>
            <p className="mt-4">
              <strong>Total:</strong>{" "}
              {currentOrder.items
                .reduce((total, item) => total + item.price * item.quantity, 0)
                .toFixed(2)}{" "}
              €
            </p>
          </div>
        )}
        <div className="mt-10">
          <h2 className="text-2xl font-bold mb-4">Vos commandes</h2>
          {orders.length === 0 ? (
            <p>Aucune commande passée.</p>
          ) : (
            <ul>
              {orders.map((order) => (
                <li key={order.id} className="mb-4">
                  <h3 className="text-xl font-semibold">
                    Commande passée le{" "}
                    {new Date(order.created_at).toLocaleString("fr-FR", {
                      timeZone: "Europe/Paris",
                    })}
                  </h3>
                  <p>Status: {order.status}</p>
                  <p>Total: {order.total_price} €</p>
                  <ul className="mt-2 ml-4">
                    {order.items.map((item) => (
                      <li key={item.id}>
                        {item.quantity} x {item.name} @ {item.price} €
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
