'use client';
import React, { useEffect, useState } from 'react';
import MenuCard from './MenuCard';

interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  image_url: string;
}

const PreOrderMenu: React.FC = () => {
  const [menus, setMenus] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        const response = await fetch(`/api/menu`);
        console.log(response);
        if (!response.ok) {
          throw new Error('Failed to fetch menu items');
        }
        const data: MenuItem[] = await response.json();
        setMenus(data);
        setLoading(false);
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError('An unknown error occurred');
        }
        setLoading(false);
      }
    };

    fetchMenuItems();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <section className="py-8 bg-[#eedfb5] pt-12">
      <h1 className="text-2xl md:text-3xl font-bold text-center mb-6 text-black">
        Nos Menus à Pré-commander
      </h1>
      <div className="m-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {menus.map(menu => (
          <MenuCard
            key={menu.id}
            id={menu.id}
            name={menu.name}
            description={menu.description}
            price={menu.price}
            image={menu.image_url}
            imageClassName="w-full h-48 md:w-[10rem] md:h-[10rem] rounded-xl object-cover"
          />
        ))}
      </div>
    </section>
  );
};

export default PreOrderMenu;