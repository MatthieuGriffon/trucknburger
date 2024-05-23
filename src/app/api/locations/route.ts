import { NextRequest, NextResponse } from 'next/server';
import pool from '@/lib/db';

type Location = {
  id: number;
  day: string;
  lat: number;
  lng: number;
  time: string;
};

// Endpoint pour récupérer les emplacements
export async function GET(request: NextRequest) {
  try {
    const client = await pool.connect();
    const result = await client.query('SELECT id, day, latitude AS lat, longitude AS lng, scheduled_at AS time FROM Locations');
    client.release();

    const locations: Location[] = result.rows.map((row) => ({
      id: row.id,
      day: row.day,
      lat: parseFloat(row.lat),
      lng: parseFloat(row.lng),
      time: new Date(row.time).toISOString(),
    }));

    return NextResponse.json(locations);
  } catch (error) {
    console.error('Error fetching locations:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}