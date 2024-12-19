// import prismadb from "@/lib/prismadb";
// import { auth,currentUser } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { authenticatedUser } from "@/app/utils/amplify-server-utils";

const prisma = new PrismaClient();

// export async function POST(
//     req: Request,) {
//     try {
        
//         const { userId } = auth();
//         const body = await req.json();

//         const { username } = body;

//         if (!userId) {
//             return new NextResponse("Unauthorized", { status: 401 });
//         }
//         if (!username) {
//             return new NextResponse("Name is required", { status: 400 });
//         }

//         const seller = await prismadb.seller.create({
//             data: {
//                 name: username,
//                 userId,
//             }
//         });

//         // return NextResponse.json(seller);

//         const response = NextResponse.json(seller);

//         // Set cookies individually
//         response.headers.append('Set-Cookie', `userId=${userId}; Path=/; HttpOnly`);
//         response.headers.append('Set-Cookie', `username=${username}; Path=/; HttpOnly`);
//         response.headers.append('Set-Cookie', `sellerId=${seller.id}; Path=/; HttpOnly`);

//         return response;

//     } catch (error) {
//         console.log('[sellerS_POST', error);
//         return new NextResponse("Internal error", { status: 500 });

//     }
// }



export async function GET(request: NextRequest) {
    const response = NextResponse.next(); // Initialize a response object

    try {
        // Retrieve authenticated user using both request and response
        const user = await authenticatedUser({ request, response });

        // If no authenticated user is found, return an error
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

        return NextResponse.json(
            { success: true, seller },
            { status: 201 }
        );
  } catch (error) {
    console.error("Unable to process the request: ", error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function PUT(req: Request, res: Response) {
        try {
            const body = await req.json();
            const { name, sellerId, phone, address, city, state, country, pincode } = body;
            console.log("body: ",body)

    
            if (!sellerId) {
                return new NextResponse("Unauthorized", { status: 401 });
            }
    
            const seller = await prisma.seller.findFirst({
                where: {
                    id: sellerId
                }
            });
    
            // console.log('sellerid',seller)
            console.log("seller: ", seller)
    
            if (!seller) {
                return new NextResponse("Seller not found", { status: 404 });
            }

            const updatedSeller = await prisma.seller.update({
                where: {
                    id: sellerId
                },
                data: {
                    name: name,
                    phone: phone,
                    address: address,
                    city: city,
                    state: state,
                    country: country,
                    pincode: pincode
                }
            });
    
            // return NextResponse.json(seller);
            const response = NextResponse.json(updatedSeller);    
            return response;
    
        } catch (error) {
            console.log('[profile_PUT]', error);
            return new NextResponse("Internal error", { status: 500 });
    
        }
    }
