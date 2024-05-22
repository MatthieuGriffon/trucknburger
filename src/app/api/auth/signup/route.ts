import { NextRequest, NextResponse } from 'next/server';
import pool from '@/lib/db';
import bcrypt from 'bcrypt';

// Handler pour la méthode POST
export async function POST(req: NextRequest) {
  const { email, password, name } = await req.json();

  if (!email || !password || !name) {
    console.error('Missing fields', { email, password, name });
    return NextResponse.json({ message: 'Missing fields' }, { status: 400 });
  }

  try {
    const client = await pool.connect();
    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await client.query(
      'INSERT INTO users (email, password, name) VALUES ($1, $2, $3) RETURNING *',
      [email, hashedPassword, name]
    );
    client.release();

    if (result.rows.length === 0) {
      console.error('User creation failed');
      return NextResponse.json({ message: 'User creation failed' }, { status: 500 });
    }

    console.log('User created:', result.rows[0]);
    return NextResponse.json({ user: result.rows[0] }, { status: 201 });
  } catch (error) {
    console.error('Error creating user:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}