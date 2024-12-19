import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// POST request to fetch seller details by product Shopify ID
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { productId } = body;
    console.log(productId,"selelrmail");
    

    // Validate input
    if (!productId) {
      return NextResponse.json({ error: 'productId is required' }, { status: 400 });
    }

    // Fetch product with seller details
    const product = await prisma.product.findMany({
        where: {
          shopifyId:productId
        },
        include: {
          options: true,
          variants: true,
          images: true,
          Seller:true
        },
      });

    if (!product) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }
    console.log(product,"productvalidated");

    const seller = product[0].Seller;

    if (!seller) {
      return NextResponse.json({ error: 'Seller details not found for this product' }, { status: 404 });
    }

    // Return seller details
    return NextResponse.json(
      {
        sellerId: seller.id,
        name: seller.name,
        email: seller.email,
        phone: seller.phone,
        address: seller.address,
        city: seller.city,
        state: seller.state,
        country: seller.country,
        pincode: seller.pincode,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error fetching seller details:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
