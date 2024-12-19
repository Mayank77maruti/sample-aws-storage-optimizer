import { NextResponse } from 'next/server';
import { mockOrders } from '@/lib/amazon-mcf';

export async function GET() {
  // In production, fetch from Amazon MCF API
  return NextResponse.json(mockOrders);
}

export async function POST(request: Request) {
  const body = await request.json();
  // In production, submit to Amazon MCF API
  return NextResponse.json({ message: 'Order created successfully' });
}