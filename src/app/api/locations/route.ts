import { NextRequest, NextResponse } from 'next/server';

type Location = {
  id: number;
  day: string;
  lat: number;
  lng: number;
  time: string;
 
};

const locations: Location[] = [
    { id: 1, day: 'Lundi', lat: 47.341551, lng: -1.5285694, time: '2024-05-17T10:00:00Z' },
    { id: 2, day : 'Mardi', lat: 47.297198, lng: -1.492123, time: '2024-05-17T12:00:00Z' },
    { id: 3, day : 'Mercredi',lat: 47.311114, lng: -1.63115, time: '2024-05-17T14:00:00Z' },
    { id: 4, day : 'Jeudi',lat: 47.293859, lng: -1.5508, time: '2024-05-17T16:00:00Z' },
    { id: 5, day :'Vendredi',lat: 47.192182, lng: -1.547174, time: '2024-05-17T18:00:00Z' },
];

export async function GET(request: NextRequest) {
  return NextResponse.json(locations);
}