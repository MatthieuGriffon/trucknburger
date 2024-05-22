"use client";
import { useSession, signOut } from "next-auth/react";
import React from "react";
import { fromZonedTime,formatInTimeZone } from 'date-fns-tz';
import { fr } from 'date-fns/locale';
import { addHours } from 'date-fns';

const ProfilePage: React.FC = () => {
  const { data: session, status } = useSession();

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
    ? new Date(addHours(new Date(updatedAt), timeZoneOffset)).toLocaleString('fr-FR', { timeZone: 'Europe/Paris' })
    : 'N/A';

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
            <strong>Dernière connexion le :</strong>{formattedDate}
          </p>
        </div>
        <div className="flex justify-between items-center mt-6">
          <button
            onClick={() => signOut()}
            className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-700"
          >
            Se déconnecter
          </button>
          <button
            onClick={() => alert("Proceeding to payment...")} // Remplacez cette ligne par la logique de paiement
            className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-700"
          >
            Passer au paiement
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
