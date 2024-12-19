// import prismadb from "@/lib/prismadb";
// import { auth, currentUser } from "@clerk/nextjs/server";
// import { NextResponse } from "next/server";
// import Shopify from "@/lib/shopify";
// import { ApiRequest, NextApiResponse } from "@/@types";
// // import { cookies } from 'next/cookies';
// import cookies from 'next-cookies'
// import nextCookies from 'next-cookies';
// import { DataType } from '@shopify/shopify-api';
// import { redirect } from 'next/navigation'
// // import jwt from 'jsonwebtoken';

// export async function POST(
//     req: Request,) {
//     try {

//         const { userId } = auth();
//         const body = await req.json();

//         const {
//             id,
//             size,
//             price,
//             Color,
//             name,
//             manu,
//             pricetocompare,
//             description

//         } = body;

//         if (!userId) {
//             return new NextResponse("Unauthorized", { status: 401 });
//         }
//         // console.log(description);
//         // console.log(pricetocompare);
//         // console.log(size);
//         const s = size.map((size: string) => (
//             {
//                 "product_id": id,
//                 "title": name,
//                 "price": price,
//                 "compare_at_price": pricetocompare,
//                 "option1": size
//             }));
//         // console.log(s);

//         const bodys = {
//             product: {
//                 'title': name,
//                 "body_html": description,
//                 "variants": s,
//                 "images": manu.Mock.map((mock: any) => (
//                     { 'src': mock.url }
//                 )),
//                 "options": [
//                     // {"name":"Color","values":["Blue","Black"]},
//                     { "name": "Size", "values": size }
//                 ]

//             },

//         };
//         console.log(bodys);

//         const cookies = req.headers.get('cookie');
//         if (!cookies) {
//             return new NextResponse("Missing cookies", { status: 403 });
//         }

//         const parsedCookies = Object.fromEntries(
//             cookies.split('; ').map(c => {
//                 const [key, value] = c.split('=');
//                 return [key, decodeURIComponent(value)];
//             })
//         );
//         const SellerId = parsedCookies.sellerId;
//         // const Username = parsedCookies.username;

//         if (!SellerId) {
//             return new NextResponse("Seller ID is required", { status: 406 });
//         }
//         const session = await prismadb.session.findFirst({
//             where: {
//                 sellerId: SellerId
//             }
//         });

//         const shopifyToken = session?.accessToken;
//         const shop = session?.shop
//         // if (!shopifyToken) {
//         //     console.log('if');
//         //     return NextResponse.redirect('https://110b-2409-40e3-3145-16ec-8548-6cab-abf4-3e6f.ngrok-free.app/api/auth/');
//         //     console.log('if after');
//         // }
//         if (!shopifyToken) {
//             return new NextResponse(JSON.stringify({ error: "Missing or invalid token" }), { status: 403 });
//         }
//         // console.log('after');
//         // console.log(shopifyToken);


//         const result = await fetch(`https://${shop}/admin/api/2024-04/products.json`, {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//                 'X-Shopify-Access-Token':
//                     shopifyToken
//             },
//             body: JSON.stringify(bodys)
//         })
//         // const resu = res.text();
//         // console.log(resu);
//         const resu = await result.json();
//         console.log("Shopify Response:", resu);
//         await prismadb.product_id.create({
//             data: {
//                 SellerProductId:id,
//                 Shopify_Product_id:resu.product.id
//             }});

        

//         return NextResponse.json(resu);
//         // const response = NextResponse.json(result);

//         // return response;

//     } catch (error) {
//         console.log('[sellerS_POST', error);
//         return new NextResponse("Internal error", { status: 500 });

//     }
// }


// export async function GET(
//     req: Request,) {
//     try {
//         console.log('api')

//         const { userId } = auth();

//         const cookies = req.headers.get('cookie');
//         if (!cookies) {
//             return new NextResponse("Missing cookies", { status: 403 });
//         }

//         const parsedCookies = Object.fromEntries(
//             cookies.split('; ').map(c => {
//                 const [key, value] = c.split('=');
//                 return [key, decodeURIComponent(value)];
//             })
//         );

//         const shopify_token = parsedCookies.shopify_token;
//         if (!shopify_token) {
//             return NextResponse.redirect(`https://${process.env.HOST}/api/auth/`);
//         }
//         console.log(shopify_token);


//         // const result = await fetch(`https://${process.env.SHOP}/admin/api/2024-04/orders.json?status=any`, {
//         //     method: 'GET',
//         //     headers: {
//         //         'X-Shopify-Access-Token':ac
//         //     }
//         // })
//         // console.log(result.text());
//         const response = NextResponse.json(shopify_token);

//         return response;
//     }catch (error) {
//         console.log('[sellerS_POST', error);
//         return new NextResponse("Internal error", { status: 500 });

//     }
// }
