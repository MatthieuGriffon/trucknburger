import { NextRequest, NextResponse } from 'next/server';
import pool from '@/lib/db';

// Endpoint pour créer une commande
export async function POST(req: NextRequest) {
  const { userId, status, totalPrice, items } = await req.json();

  if (!userId || !status || !totalPrice || !items) {
    return NextResponse.json({ message: 'Missing required fields' }, { status: 400 });
  }

  try {
    const client = await pool.connect();

    // Créer la commande
    const orderResult = await client.query(
      'INSERT INTO Orders (user_id, status, total_price) VALUES ($1, $2, $3) RETURNING id',
      [userId, status, totalPrice]
    );

    const orderId = orderResult.rows[0].id;

    // Créer les articles de commande
    const orderItemsPromises = items.map((item: any) =>
      client.query(
        'INSERT INTO OrderItems (order_id, menu_item_id, quantity, price) VALUES ($1, $2, $3, $4)',
        [orderId, item.menuItemId, item.quantity, item.price]
      )
    );

    await Promise.all(orderItemsPromises);

    client.release();

    return NextResponse.json({ orderId }, { status: 201 });
  } catch (error) {
    console.error('Error creating order:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}

// Endpoint pour récupérer les commandes d'un utilisateur
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get('userId');

  if (!userId) {
    return NextResponse.json({ message: 'Missing userId' }, { status: 400 });
  }

  try {
    const client = await pool.connect();
    const ordersResult = await client.query(
      'SELECT * FROM Orders WHERE user_id = $1 ORDER BY created_at DESC',
      [userId]
    );

    const orders = ordersResult.rows;

    // Récupérer les items de chaque commande avec le nom des articles depuis MenuItems
    const ordersWithItems = await Promise.all(
      orders.map(async (order) => {
        const itemsResult = await client.query(
          `SELECT OrderItems.*, MenuItems.name 
           FROM OrderItems 
           JOIN MenuItems ON OrderItems.menu_item_id = MenuItems.id 
           WHERE OrderItems.order_id = $1`,
          [order.id]
        );
        return {
          ...order,
          items: itemsResult.rows,
        };
      })
    );

    client.release();

    return NextResponse.json(ordersWithItems, { status: 200 });
  } catch (error) {
    console.error('Error fetching orders:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}
