'use client';

import { useSession, signOut } from "next-auth/react";
import React, { useEffect, useState } from "react";
import { addHours } from "date-fns";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../app/store";
import { clearCart } from "../../app/store/cartSlice";
import { Order } from "../../../types/types";
import LoginModal from "@/components/LoginModal";

const ProfilePage: React.FC = () => {
  const { data: session, status } = useSession();
  const dispatch = useDispatch<AppDispatch>();
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const [orders, setOrders] = useState<Order[]>([]);
  const [currentOrder, setCurrentOrder] = useState<Order | null>(null);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [showDemoAlert, setShowDemoAlert] = useState(false);

  useEffect(() => {
    if (status === "authenticated" && session?.user?.id) {
      fetchOrders(session.user.id);
    } else if (status === "unauthenticated") {
      setIsLoginModalOpen(true);
    }

    const savedOrder = localStorage.getItem("currentOrder");
    if (savedOrder) {
      setCurrentOrder(JSON.parse(savedOrder));
    }
  }, [status, session]);

  const fetchOrders = async (userId: string) => {
    const response = await fetch(`/api/orders?userId=${userId}`);
    if (response.ok) {
      const data: Order[] = await response.json();
      setOrders(data);
    } else {
      console.error("Failed to fetch orders");
    }
  };

  const handlePayment = () => {
    setShowDemoAlert(true);
  };

  const handleDemoAlertClose = () => {
    setShowDemoAlert(false);
    signOut();
  };

  if (status === "loading") {
    return <div className="text-center py-10">Loading...</div>;
  }

  if (status === "unauthenticated") {
    return (
      <>
        <div className="fixed text-center py-10 z-100">Vous n&apos;êtes pas connecté.</div>
        {isLoginModalOpen && <LoginModal onClose={() => setIsLoginModalOpen(false)} />}
      </>
    );
  }

  const updatedAt = session?.user?.updated_at;

  const timeZoneOffset = 2;
  const formattedDate = updatedAt
    ? new Date(addHours(new Date(updatedAt), timeZoneOffset)).toLocaleString(
        "fr-FR",
        { timeZone: "Europe/Paris" }
      )
    : "N/A";

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-lg text-zinc-950 relative">
        <h1 className="text-3xl font-bold mb-4">Profil de l&apos;utilisateur</h1>
        <div className="mb-4">
          <p className="text-lg">
            <strong>Nom:</strong> {session?.user?.name}
          </p>
          <p className="text-lg">
            <strong>Email:</strong> {session?.user?.email}
          </p>
          <p className="text-lg">
            <strong>Dernière connexion le :</strong> {formattedDate}
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
        {isLoginModalOpen && <LoginModal onClose={() => setIsLoginModalOpen(false)} />}
        {showDemoAlert && (
          <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="bg-white p-4 border border-red-500 rounded bg-red-100 text-red-800 shadow-lg">
              <h2 className="text-xl font-bold mb-2 h-full">Attention</h2>
              <p>
                Ceci est un site fictif créé pour des fins de démonstration. Aucune
                commande réelle ne sera traitée.
              </p>
              <button
                onClick={handleDemoAlertClose}
                className="mt-4 bg-red-500 text-white py-2 px-4 rounded hover:bg-red-700"
              >
                Se déconnecter
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
