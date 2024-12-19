// import { NextApiRequest, NextApiResponse } from 'next';
// import { PrismaClient } from '@prisma/client';
// import Shopify from '@shopify/shopify-api'; // Ensure Shopify API library is installed
// const prisma = new PrismaClient();
// import cookie from 'cookie';

// export async function POST(req: NextApiRequest, res: NextApiResponse) {
//     // if (req.method !== 'POST') {
//     //     return res.status(405).json({ error: 'Method not allowed' });
//     // }

//     const { sellerId, product } = req.body;

//     if (!sellerId || !product) {
//         return res.status(400).json({ error: 'Missing sellerId or product data' });
//     }

//     try {
//         // Fetch the Shopify session
//         const session = await prisma.session.findUnique({
//             where: { sellerId },
//         });

//         if (!session) {
//             return res.status(400).json({ error: 'No Shopify session found for the seller' });
//         }

//         const cookies = cookie.parse(req.headers.cookie || '');

//         // Extract the `onestop_vyapar_user` cookie
//         const userCookie = cookies['accessToken'];
//         console.log(userCookie)

//         // Create Shopify REST client
//         // const shopifyClient = new Shopify.Clients.Rest(session.shop, session.accessToken);

//         // // Push the product to Shopify
//         // const shopifyProduct = await shopifyClient.post({
//         //   path: 'products',
//         //   data: {
//         //     product: {
//         //       title: product.title,
//         //       body_html: product.bodyHtml,
//         //       vendor: product.vendor,
//         //       product_type: product.productType,
//         //       tags: product.tags,
//         //       variants: product.variants.map((variant: any) => ({
//         //         title: variant.title,
//         //         price: variant.price.toString(),
//         //         sku: variant.sku,
//         //         inventory_quantity: variant.inventoryQty,
//         //       })),
//         //       options: product.options.map((option: any) => ({
//         //         name: option.name,
//         //         values: option.values.split(', '), // Convert string back to an array
//         //       })),
//         //       images: product.images.map((image: any) => ({
//         //         src: image.url,
//         //       })),
//         //     },
//         //   },
//         //   type: Shopify.DataType.JSON,
//         // });

        

//         const body = {
//             product: {
//                 title: product.title,
//                 body_html: product.bodyHtml,
//                 vendor: product.vendor,
//                 product_type: product.productType,
//                 tags: product.tags,
//                 variants: product.variants.map((variant: any) => ({
//                     title: variant.title,
//                     price: variant.price,
//                     sku: variant.sku,
//                     inventory_quantity: variant.inventoryQty
//                 })),
//                 options: product.options.map((option: any) => ({
//                     name: option.name,
//                     values: option.values.split(", ") // Convert string back to an array
//                 })),
//                 images: product.images.map((image: any) => ({
//                     src: image.url
//                 }))
//             }
//         };
//         const result = await fetch(`https://${session.shop}/admin/api/2024-04/products.json`, {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//                 'X-Shopify-Access-Token':
//                 String(userCookie)
//             },
//             body: JSON.stringify(body)
//         })
//         console.log(result);

//         // Update the Shopify ID in the database
//         const responseData = await result.json();

//         // Update the Prisma database
//         if (!result.ok || !responseData?.product?.id) {
//             // Handle Shopify API errors
//             console.error("Failed to push product:", responseData);
//             return res.status(result.status).json({
//                 error: "Failed to push product to Shopify",
//                 details: responseData?.errors || "Unknown error",
//             });
//         }

//         // Success response
//         res.status(200).json({
//             message: "Product pushed to Shopify successfully",
//             shopifyId: responseData.product.id,
//         });
//     } catch (error) {
//         // Handle unexpected errors and narrow the type
//         if (error instanceof Error) {
//             console.error("Error pushing product to Shopify:", error);
//             res.status(500).json({
//                 error: "Failed to push product to Shopify",
//                 details: error.message,
//             });
//         } else {
//             console.error("Unexpected error:", error);
//             res.status(500).json({
//                 error: "Failed to push product to Shopify",
//                 details: "An unknown error occurred.",
//             });
//         }
//     }
// }

import { PrismaClient } from '@prisma/client';
import { parse } from 'cookie';


const prisma = new PrismaClient();

export async function POST(req: Request) {
    try {
        const body = await req.json();
        // console.log(body);
        const { sellerId, product } = body;

        if (!sellerId || !product) {
            return new Response(
                JSON.stringify({ error: 'Missing sellerId or product data' }),
                { status: 400 }
            );
        }

        // Fetch the Shopify session
        const session = await prisma.session.findUnique({
            where: { sellerId },
        });

        if (!session) {
            return new Response(
                JSON.stringify({ error: 'No Shopify session found for the seller' }),
                { status: 400 }
            );
        }

        // Parse cookies from the incoming request
        // const cookies = parse(req.headers.get('cookie') || '');

        // const userCookie = cookies['accessToken'];

        // if (!userCookie) {
        //     return new Response(
        //         JSON.stringify({ error: 'Missing access token in cookies' }),
        //         { status: 401 }
        //     );
        // }

        // Shopify request body
        const shopifyBody = {
            product: {
                title: product.title,
                body_html: product.bodyHtml,
                vendor: product.vendor,
                product_type: product.productType,
                tags: product.tags,
                variants: product.variants
                .map((variant: any) => ({
                    title: variant.title,
                    price: variant.price,
                    sku: variant.sku,
                    inventory_quantity: variant.inventoryQty,
                    option1:variant.sku
                }))
                ,
                // options: product.options.map((option: any) => ({
                //     "name": option.name,
                //     "values": option.values,
                // })),
                // options: { "name": "Size", "values": ["Small","Large"] },
                images: product.images.map((image: any) => ({
                    src: image.url,
                })),
            },
        };

        // Push product to Shopify
        const shopifyResponse = await fetch(
            `https://${session.shop}/admin/api/2024-04/products.json`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-Shopify-Access-Token': String(session.accessToken),
                },
                body: JSON.stringify(shopifyBody),
            }
        );

        const responseData = await shopifyResponse.json();

        if (!shopifyResponse.ok || !responseData?.product?.id) {
            console.error('Failed to push product:', responseData);
            return new Response(
                JSON.stringify({
                    error: 'Failed to push product to Shopify',
                    details: responseData?.errors || 'Unknown error',
                }),
                { status: shopifyResponse.status }
            );
        }
        const productres = await prisma.product.upsert({
            where: {
              id: product.id, // Use the unique identifier for the product
            },
            update: {
              shopifyId:responseData.product.id, // Update only the shopifyId field
            },
            create: {
              title:product.title,
              bodyHtml:product.bodyHtml,
              vendor:product.vendor,
              productType:product.productType,
              tags: Array.isArray(product.tags)
                ? product.tags
                : product.tags.split(",").map((tag: string) => tag.trim()),
              sellerId:product.sellerId,
              shopifyId:213, // Include shopifyId in the create data as well
            //   options: {
            //     create: product.Options.map((option: any) => ({
            //       name: option.name,
            //       values: option.values, // Assuming you are storing this as a JSON array in the database
            //     })),
            //   },
              variants: {
                create: product.variants.map(
                  (variant: {
                    title: string;
                    price: number;
                    sku?: string;
                    inventoryQty: number;
                  }) => ({
                    title: variant.title,
                    price: variant.price,
                    sku: variant.sku,
                    inventoryQty: variant.inventoryQty,
                  })
                ),
              },
              images: {
                create: product.images.map((image: { url: string }) => ({
                  url: image.url,
                })),
              },
            },
          });
          
        //   console.log("Product:", productres);
          
        // Success response
        return new Response(
            JSON.stringify({
                message: 'Product pushed to Shopify successfully',
                shopifyId: responseData.product.id,
            }),
            { status: 200 }
        );
    } catch (error) {
        console.error('Error:', error);
        return new Response(
            JSON.stringify({
                error: 'Failed to push product to Shopify',
                details: error instanceof Error ? error.message : 'Unknown error',
            }),
            { status: 500 }
        );
    }
}

