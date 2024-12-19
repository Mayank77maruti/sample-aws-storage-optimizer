import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient, Prisma } from '@prisma/client';
const prisma = new PrismaClient();

// Fetch products for a specific seller
export async function GET(request: NextRequest) {
  const sellerId = request.nextUrl.searchParams.get('sellerId');
  if (!sellerId) {
    return NextResponse.json({ error: 'Seller ID is required' }, { status: 400 });
  }
  
  try {
    const products = await prisma.product.findMany({
      where: { sellerId },
      include: {
        images: true,
        options: true,
        variants: true,
      },
    });
    return NextResponse.json(products);
  } catch (error:any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// Create a new product
export async function POST(request: NextRequest) {
  const body = await request.json();
  const { sellerId, title, bodyHtml, productType, tags, vendor } = body;

  if (!sellerId || !title || !bodyHtml || !productType || !vendor) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
  }

  try {
    const newProduct = await prisma.product.create({
      data: {
        sellerId,
        title,
        bodyHtml,
        productType,
        tags,
        vendor,
      },
    });
    return NextResponse.json(newProduct);
  } catch (error:any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// Update an existing product
export async function PATCH(request: NextRequest) {
  const body = await request.json();
  const { productId, ...updateData } = body;

  if (!productId) {
    return NextResponse.json({ error: 'Product ID is required' }, { status: 400 });
  }

  try {
    const updatedProduct = await prisma.product.update({
      where: { id: productId },
      data: updateData,
    });
    return NextResponse.json(updatedProduct);
  } catch (error:any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
