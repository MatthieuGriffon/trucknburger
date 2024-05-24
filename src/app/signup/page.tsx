"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import backgroundHome from "../../../public/img/backgroundHome.webp"

const SignupPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch("/api/auth/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
        name,
      }),
    });

    if (res.ok) {
      router.push("/profile");
    } else {
      const errorData = await res.json();
      setError(errorData.message);
    }
  };

  return (
    <div className="py-10">
       <Image
          priority
          placeholder="blur"
          quality={100}
          fill
          src={backgroundHome}
          alt="Background Page Home TrucknBurger"
          style={{
            objectFit: "cover",
            zIndex: -1,
          }}
        />
      <div className="max-w-md mx-auto bg-white/50 p-6 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold mb-4 text-black">Créer un compte</h1>
        <form onSubmit={handleSignup}>
          <div className="mb-4">
            <label className="block text-gray-700">Nom</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 border rounded text-black"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border rounded text-black"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Mot de passe</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border rounded text-black"
              required
            />
          </div>
          {error && <div className="text-red-500 mb-4">{error}</div>}
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            S&apos;inscrire
          </button>
          <div className="mt-4 bg-gray-500/90 text-black">
            <p>
              Vous pourrez entrer vos informations de connexion lors de la
              prochaine étape après avoir terminé votre inscription.
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignupPage;
