import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient, Prisma } from '@prisma/client';
const prisma = new PrismaClient();


export async function POST(req: NextRequest) {
    // const body = await request.json();
    const topic = req.headers.get("x-shopify-topic");
    const shop = req.headers.get("x-shopify-shop-domain");
    const body = await req.text();

    console.log("order",body);
  
    // if (!sellerId || !status || totalPrice == null || !currency) {
    //   return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    // }
  
    // try {
    //   const newOrder = await prisma.order.create({
    //     data: {
    //       sellerId,
    //       status,
    //       totalPrice,
    //       currency,
    //       customerId,
    //     },
    //   });
    //   return NextResponse.json(newOrder);
    // } catch (error:any) {
    //   return NextResponse.json({ error: error.message }, { status: 500 });
    // }
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
  