import React from "react";
import MenuCard from "./MenuCard";


const PreOrderMenu: React.FC = () => {
  // Exemple de données fictives pour les menus
  const menus = [
    {
      title: "Menu Burger Classique",
      description:
        "Un délicieux burger avec du bœuf, du fromage, des tomates et de la laitue.",
      price: "10,00 €",
      image: "/img/burger01.webp",
    },
    {
      title: "Menu Burger Poulet",
      description:
        "Burger de poulet croustillant avec mayonnaise épicée, laitue et tomates.",
      price: "11,50 €",
      image: "/img/burgerPoulet.webp",
    },
    {
      title: "Menu Burger Végétarien",
      description:
        "Un burger végétarien avec un steak de légumes, avocat, et sauce spéciale.",
      price: "9,50 €",
      image: "/img/burger_vegetarien.webp",
    },
    {
      title: "Burger Bacon",
      description: "Un délicieux burger avec du bœuf, du fromage, du bacon, des tomates et de la laitue.",
      price: "12,00 €",
      image: "/img/burger_bacon.webp", // Utilisez le chemin de l'image générée
    },
    {
      title: "Menu Enfant",
      description: "Petit burger, frites et une boisson pour les enfants gourmand.",
      price: "7,00 €",
      image: "/img/menu_enfant.webp",
    },
    {
      title: "Menu Wraps",
      description: "Un délicieux wrap avec du poulet, des légumes et de la sauce.",
      price: "9,00 €",
      image: "/img/wrap.webp",
    },
  ];

  return (
    <section className="py-8 bg-[#eedfb5]">
      <h1 className="text-3xl font-bold text-center mb-6 text-black">
        Nos Menus à Pré-commander
      </h1>
      <div className="m-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {menus.map((menu, index) => (
          <MenuCard
            key={index}
            title={menu.title}
            description={menu.description}
            price={menu.price}
            image={menu.image}
            imageClassName="w-[10rem] h-[10rem] rounded-xl"
          />
        ))}
      </div>
    </section>
  );
};

export default PreOrderMenu;
