import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient, Prisma } from '@prisma/client';
const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
  const sellerId = request.nextUrl.searchParams.get("sellerId");
  if (!sellerId) {
    return NextResponse.json({ error: "Seller ID is required" }, { status: 400 });
  }

  try {
    const orders = await prisma.order.findMany({
      where: { sellerId },
      include: {
        billingAddress: true,
        shippingAddress: true,
        orderProducts: {
          include: { Product: true },
        },
        fulfillment: true,
        Customer:true
      },
    });

    // Convert BigInt values to strings
    const processedOrders = orders.map((order) =>
      JSON.parse(
        JSON.stringify(order, (key, value) =>
          typeof value === "bigint" ? value.toString() : value
        )
      )
    );

    return NextResponse.json(processedOrders);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}


// Create a new order
export async function POST(request: NextRequest) {
  const body = await request.json();
  const { sellerId, status, totalPrice, currency, customerId } = body;

  if (!sellerId || !status || totalPrice == null || !currency) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
  }

  try {
    const newOrder = await prisma.order.create({
      data: {
        sellerId,
        status,
        totalPrice,
        currency,
        customerId,
      },
    });
    return NextResponse.json(newOrder);
  } catch (error:any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// Update an existing order
export async function PATCH(request: NextRequest) {
  const body = await request.json();
  const { orderId, ...updateData } = body;

  if (!orderId) {
    return NextResponse.json({ error: 'Order ID is required' }, { status: 400 });
  }

  try {
    const updatedOrder = await prisma.order.update({
      where: { id: orderId },
      data: updateData,
    });
    return NextResponse.json(updatedOrder);
  } catch (error:any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
