import { NextRequest, NextResponse } from 'next/server';
import { Client } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

export async function GET(req: NextRequest) {
  const client = new Client({
    user: process.env.PGUSER,
    host: process.env.PGHOST,
    database: process.env.PGDATABASE,
    password: process.env.PGPASSWORD,
    port: parseInt(process.env.PGPORT || '5432', 10), // Convertir en nombre
  });

  await client.connect();

  try {
    const result = await client.query('SELECT * FROM "menuitems"');
    
    return NextResponse.json(result.rows, { status: 200 });
  } catch (error) {
    console.error('Error fetching menu items:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  } finally {
    await client.end();
  }
}