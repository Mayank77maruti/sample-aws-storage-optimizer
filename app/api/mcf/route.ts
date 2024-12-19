import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { authenticatedUser } from "@/app/utils/amplify-server-utils";

const prisma = new PrismaClient();

export async function POST(req: Request, res: Response) {
    try {
        const { sellerId, orderId, shippingMethod, address, deliveryDate, items } = await req.json();

        const mfcShipmentOrder = await prisma.mCFShipment.create({
            data: {
                sellerId: sellerId,
                orderId: orderId,
                address: address,
                shippingMethod: shippingMethod,
                deliveryDate: deliveryDate,
                items: items
            }
        });

        return NextResponse.json(
            { success: true, mfcShipmentOrder },
            { status: 200 }
        );
    } catch (error) {
        console.log('Can not make MCF Shipments: ', error);
        return new NextResponse("Internal error", { status: 500 });
    }
}

export async function GET(request: NextRequest) {
    const response = NextResponse.next();
    try {
        const user = await authenticatedUser({ request, response });

        if (!user) {
            return NextResponse.json(
                { success: false, error: "User not authenticated" },
                { status: 401 }
            );
        }

        const sellerId = String(user?.userId)

        const mfcShipmentOrders = await prisma.mCFShipment.findMany({
            where: {
                sellerId: sellerId
            }
        });
        
        return NextResponse.json(
            { success: true, mfcShipmentOrders },
            { status: 201 }
        );
    } catch (error) {
        console.log('Can get MCF Shipments: ', error);
        return new NextResponse("Internal error", { status: 500 });
    }
}