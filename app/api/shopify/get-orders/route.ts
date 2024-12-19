// import prismadb from "@/lib/prismadb";
// import { auth, currentUser } from "@clerk/nextjs/server";
// import { NextResponse } from "next/server";
// import Shopify from "@/lib/shopify";


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
//         const shop = session?.shop;
//         // if (!shopifyToken) {
//         //     console.log('if');
//         //     return NextResponse.redirect('https://110b-2409-40e3-3145-16ec-8548-6cab-abf4-3e6f.ngrok-free.app/api/auth/');
//         //     console.log('if after');
//         // }
//         if (!shopifyToken) {
//             return new NextResponse(JSON.stringify({ error: "Missing or invalid token" }), { status: 403 });
//         }

//         const result = await fetch(`https://${shop}/admin/api/2024-10/orders.json?status=any`, {
//             method: 'GET',
//             headers: {
//                 'X-Shopify-Access-Token': shopifyToken
//             }
//         })
//         // console.log(result);
//         const resu = await result.json();
//         console.log(resu);
//         // console.log(req.text());

//         const response = NextResponse.json(resu);
//         response.headers.append('Set-Cookie', `shop=${shop}; Path=/; HttpOnly`);

//         return response;
//     } catch (error) {
//         console.log('[sellerS_POST', error);
//         return new NextResponse("Internal error", { status: 500 });

//     }
// }
