"use client";
import React, { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

const LoginModal: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    if (res?.error) {
      setError("Invalid email or password");
    } else {
      onClose();
      router.push("/profile");
    }
  };

  const handleSocialSignIn = async (provider: string) => {
    const res = await signIn(provider, { redirect: false });
    if (res?.error) {
      setError(`Error signing in with ${provider}`);
    } else {
      onClose();
      router.push("/profile");
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 xl:text-xl">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-4 text-black text-center">Connexion</h2>
        <form onSubmit={handleSubmit}>
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
            className="bg-blue-800 text-white px-4 py-2 rounded hover:bg-blue-900 w-full mb-2"
          >
            Se connecter
          </button>
        </form>
        <div className="mt-4">
          <button
            onClick={() => handleSocialSignIn("google")}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700 w-full mb-2"
          >
            Se connecter avec Google
          </button>
          <button
            onClick={() => handleSocialSignIn("github")}
            className="bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-900 w-full mb-2"
          >
            Se connecter avec GitHub
          </button>
        </div>

        <p className="mt-4 w-full flex flex-col items-center text-black">
          Pas de compte ?{" "}
          <a href="/signup" className="bg-green-800 text-white px-4 py-2 rounded hover:bg-green-900 w-full mb-2 text-center">
            Créer un compte
          </a>
        </p>
        <button
          onClick={onClose}
          className="bg-orange-800 text-white px-4 py-2 rounded hover:bg-orange-900 w-full mb-2 text-center"
        >
          Quitter
        </button>
      </div>
    </div>
  );
};

export default LoginModal;
