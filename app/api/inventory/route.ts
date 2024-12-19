import { NextResponse } from 'next/server';
import { mockInventory } from '@/lib/amazon-mcf';

export async function GET() {
  // In production, fetch from Amazon MCF API
  return NextResponse.json(mockInventory);
}

export async function PATCH(request: Request) {
  const body = await request.json();
  // In production, update inventory in Amazon MCF
  return NextResponse.json({ message: 'Inventory updated successfully' });
}