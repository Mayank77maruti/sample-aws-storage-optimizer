
import { authenticatedUser } from "@/app/utils/amplify-server-utils";
import { type NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function POST(req: NextRequest, res: NextResponse) {
    try {
        // Parse the JSON body from the request
        const { name } = await req.json();
        console.log(name);

        // Retrieve authenticated user from the request
        const user = await authenticatedUser({ request: req, response: res });
        console.log(user?.signInDetails?.loginId);
        // If no authenticated user is found, return an error
        if (!user) {
            return new Response(
                JSON.stringify({ success: false, error: "User not authenticated" }),
                { status: 401 }
            );
        }
        console.log(user?.signInDetails?.loginId);
        const email = String(user?.signInDetails?.loginId);

        const seller = await prisma.seller.findUnique({
            where: {
                email: email,
            },
        });
        if (!seller) {
            return new Response(
              JSON.stringify({ success: false, error: "Seller not found" }),
              { status: 404 }
            );
          }

        console.log(seller);

        // Validate the input
        if (!name || typeof name !== "string") {
            return new Response(
                JSON.stringify({ success: false, error: "Invalid name" }),
                { status: 400 }
            );
        }

        // Create the seller in the database
        const session = await prisma.session.create({
            data:{
              sellerId: seller.id,  // The existing sellerId
              shop: name,
              state: 'active',
              isOnline: true,
              accessToken: '',
              expires: null,
            }
          });

        return new Response(
            JSON.stringify({ success: true, response: session }),
            { status: 201 }
        );
    } catch (error) {
        console.error("Unable to create user entry: ", error);
        return new Response(
            JSON.stringify({ success: false, error: "Internal server error" }),
            { status: 500 }
        );
    } finally {
        // Disconnect the Prisma Client after use
        await prisma.$disconnect();
    }
}
