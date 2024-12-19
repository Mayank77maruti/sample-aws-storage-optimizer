import { PrismaClient } from '@prisma/client';
import { NextResponse , NextRequest } from 'next/server';


const prisma = new PrismaClient();

export async function POST(req: Request) {
    //   if (req.method !== 'POST') {
    //     return res.status(405).json({ error: 'Method not allowed' });
    //   }

    try {
        const {
            title,
            bodyHtml,
            vendor,
            productType,
            tags,
            options,
            variants,
            images,
            sellerId,
        } = await req.json();

        console.log("images server: ", images);

        // Validate required fields
        if (!title || !sellerId) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }
        const formattedOptions = options.map((option: any) => ({
            name: option.name,
            values: Array.isArray(option.values) ? option.values : option.values.split(',').map((value: string) => value.trim())
          }));

        // Create product in the database
        const product = await prisma.product.create({
            data: {
                title,
                bodyHtml,
                vendor,
                productType,
                tags: Array.isArray(tags)
                    ? tags
                    : tags.split(",").map((tag: string) => tag.trim()),
                sellerId,
                options: {
                    create: formattedOptions.map((option: any) => ({
                      name: option.name,
                      values: option.values, // Assuming you are storing this as a JSON array in the database
                    }))
                  },
                variants: {
                    create: variants.map(
                        (variant: { title: string; price: number; sku?: string; inventoryQty: number }) => ({
                            title: variant.title,
                            price: variant.price,
                            sku: variant.sku,
                            inventoryQty: variant.inventoryQty,
                        })
                    ),
                },
                images: {
                  create: images.map((image: { url: string }) => ({
                      url: image.url,
                  })),
                },
            },
        });
        console.log(product);

        // Push product to Shopify
        // const session = await prisma.session.findUnique({
        //   where: { sellerId },
        // });

        // if (!session) {
        //   return res.status(400).json({ error: 'No Shopify session found for the seller' });
        // }

        // const shopifyClient = new Shopify.Clients.Rest(session.shop, session.accessToken);

        // const shopifyProduct = await shopifyClient.post({
        //     path: 'products',
        //     data: {
        //       product: {
        //         title: product.title,
        //         body_html: product.bodyHtml,
        //         vendor: product.vendor,
        //         product_type: product.productType,
        //         tags: product.tags,
        //         variants: product.variants.map((variant) => ({
        //           title: variant.title,
        //           price: variant.price.toString(),
        //           sku: variant.sku,
        //           inventory_quantity: variant.inventoryQty,
        //         })),
        //         options: product.options.map((option) => ({
        //           name: option.name,
        //           values: option.values.split(', '), // Splitting the string back into an array
        //         })),
        //         images: product.images.map((image) => ({
        //           src: image.url,
        //         })),
        //       },
        //     },
        //     type: Shopify.DataType.JSON,
        //   });

        // // Update Shopify ID in the database
        // await prisma.product.update({
        //   where: { id: product.id },
        //   data: { shopifyId: BigInt(shopifyProduct.body.product.id) },
        // });

        return NextResponse.json({ message: 'Product created successfully', product }, { status: 200 });
    } catch (error) {
        console.error('Error creating product:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
};

export async function GET(request: NextRequest) {
  const response = NextResponse.next();
  try {
    const userCookie = request.cookies.get("onestop_vyapar_user");
    if (!userCookie) {
      return NextResponse.json(
        { success: false, error: "User not authenticated" },
        { status: 401 }
      );
    }

    // Parse the user JSON from the cookie
    const user = JSON.parse(userCookie.value);
    if (!user) {
      return NextResponse.json(
        { success: false, error: "User not authenticated" },
        { status: 401 }
      );
    }
    const email = String(user?.signInDetails?.loginId);

    const seller = await prisma.seller.findUnique({
      where: {
        email: email,
      },
    });

    if (!seller) {
      return NextResponse.json(
        { success: false, error: "Seller not found" },
        { status: 404 }
      );
    }

    const sellerId = seller.id;
    const products = await prisma.product.findMany({
      where: {
        sellerId
      },
      include: {
        options: true,
        variants: true,
        images: true,
      },
    });

    // Convert BigInt to string for JSON serialization
    const productsWithStringBigInt = products.map(product => {
      return JSON.parse(JSON.stringify(product, (key, value) =>
        typeof value === 'bigint' ? value.toString() : value
      ));
    });

    console.log(productsWithStringBigInt);

    return NextResponse.json(productsWithStringBigInt, { status: 200 });
  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// export async function GET(request: NextRequest) {
//   const response = NextResponse.next();
//     try {
//       const userCookie = request.cookies.get("onestop_vyapar_user");
//     if (!userCookie) {
//       return NextResponse.json(
//         { success: false, error: "User not authenticated" },
//         { status: 401 }
//       );
//     }

//     // Parse the user JSON from the cookie
//     const user = JSON.parse(userCookie.value);
//     if (!user) {
//       return NextResponse.json(
//         { success: false, error: "User not authenticated" },
//         { status: 401 }
//       );
//     }
//     const email = String(user?.signInDetails?.loginId);

//     const seller = await prisma.seller.findUnique({
//       where: {
//         email: email,
//       },
//     });

//     if (!seller) {
//       return NextResponse.json(
//         { success: false, error: "Seller not found" },
//         { status: 404 }
//       );
//     }

//     const sellerId = seller.id;
//       const products = await prisma.product.findMany({
//         where:{
//           sellerId
//         },
//         include: {
//           options: true,
//           variants: true,
//           images: true,
//         },
//       });
//       console.log(products)
  
//       return NextResponse.json(products, { status: 200 });
//     } catch (error) {
//       console.error('Error fetching products:', error);
//       return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
//     }
//   }
