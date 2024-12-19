import { NextResponse } from "next/server";
import { PrismaClient, Prisma } from '@prisma/client';
const prisma = new PrismaClient();
type AddressCreateWithoutOrderBillingAddressInput = Prisma.AddressCreateWithoutOrderBillingAddressInput;

export async function GET(req: Request) {
    try {
        const cookies = req.headers.get('cookie');
        if (!cookies) {
            return new NextResponse("Missing cookies", { status: 403 });
        }

        const parsedCookies = Object.fromEntries(
            cookies.split('; ').map((c) => {
                const [key, value] = c.split('=');
                return [key, decodeURIComponent(value)];
            })
        );

        const sellerId = parsedCookies.SellerId;

        
        const session = await prisma.session.findUnique({
            where: { sellerId },
        });
        // console.log(seller);
        const shopifyToken = session?.accessToken;

        if (!session) {
            return new Response(
                JSON.stringify({ error: 'No Shopify seller found for the seller' }),
                { status: 400 }
            );
        }

        if (!shopifyToken) {
            return NextResponse.redirect(`https://${process.env.HOST}/api/auth/`);
        }

        const result = await fetch(
            `https://${process.env.SHOP}/admin/api/2024-10/orders.json?status=any`,
            {
                method: 'GET',
                headers: {
                    'X-Shopify-Access-Token': shopifyToken,
                },
            }
        );

        const shopifyOrders = await result.json();

        if (!shopifyOrders || !shopifyOrders.orders) {
            return new NextResponse("No orders found", { status: 404 });
        }

        for (const order of shopifyOrders.orders) {
            let customer = null;
        
            // Check if customer data exists in the order
            if (order.customer && order.customer.id) {
                // Create or connect the Customer
                customer = await prisma.customer.upsert({
                    where: { id: order.customer.id.toString() },
                    update: {
                        email: order.customer.email || "",
                        firstName: order.customer.first_name || "",
                        lastName: order.customer.last_name || "",
                        phone: order.customer.phone || null,
                        tags: order.customer.tags ? order.customer.tags.split(",") : [],
                    },
                    create: {
                        id: order.customer.id.toString(),
                        shopifyId: BigInt(order.customer.id),
                        email: order.customer.email || "",
                        firstName: order.customer.first_name || "",
                        lastName: order.customer.last_name || "",
                        phone: order.customer.phone || null,
                        tags: order.customer.tags ? order.customer.tags.split(",") : [],
                    },
                });
            }
        
            const resOrder = await prisma.order.upsert({
                where: { shopifyId: BigInt(order.id) },
                update: {
                    status: order.financial_status,
                    totalPrice: parseFloat(order.total_price),
                    currency: order.currency,
                    fulfillmentStatus: order.fulfillment_status,
                    financialStatus: order.financial_status,
                    Customer: customer
                        ? { connect: { id: customer.id } }
                        : undefined, // Ensure a Customer is connected if available
                    billingAddress: order.billing_address
                        ? {
                            connectOrCreate: {
                                where: { id: order.billing_address.id?.toString() || "" },
                                create: mapAddress(order.billing_address),
                            },
                        }
                        : undefined, // Skip if no billing address
        
                    shippingAddress: order.shipping_address
                        ? {
                            connectOrCreate: {
                                where: { id: order.shipping_address.id?.toString() || "" },
                                create: mapAddress(order.shipping_address),
                            },
                        }
                        : undefined, // Skip if no shipping address
                },
                create: {
                    shopifyId: BigInt(order.id),
                    Seller: { connect: { id: sellerId } },
                    status: order.financial_status,
                    totalPrice: parseFloat(order.total_price),
                    currency: order.currency,
                    fulfillmentStatus: order.fulfillment_status,
                    financialStatus: order.financial_status,
                    Customer: customer
                        ? { connect: { id: customer.id } }
                        : undefined,
                    billingAddress: order.billing_address
                        ? { create: mapAddress(order.billing_address) }
                        : undefined,
                    shippingAddress: order.shipping_address
                        ? { create: mapAddress(order.shipping_address) }
                        : undefined,
                },
            });
        
            // console.log(resOrder, "order");
        
            for (const lineItem of order.line_items) {
                const res = await prisma.orderProduct.create({
                    data: {
                        orderId: resOrder.id,
                        productId: lineItem.product_id
                            ? lineItem.product_id.toString()
                            : "9c347b12-065d-4cd7-9bae-692c2b06efa2", // Provide a default or skip
                        quantity: lineItem.quantity,
                        price: parseFloat(lineItem.price),
                    },
                });
                // console.log(res, "line items");
            }
        }
        

        return NextResponse.json({ message: "Orders synchronized successfully.",orders:shopifyOrders });
    } catch (error) {
        console.error('[SYNC_ORDERS_ERROR]', error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}

function mapAddress(address: any): AddressCreateWithoutOrderBillingAddressInput {
    if (!address) {
        throw new Error("Invalid address provided to mapAddress");
    }
    return {
        firstName: address.first_name,
        lastName: address.last_name,
        address1: address.address1,
        address2: address.address2 || null,
        city: address.city,
        province: address.province,
        provinceCode: address.province_code,
        country: address.country,
        countryCode: address.country_code,
        postalCode: address.zip,
        phone: address.phone || null,
        latitude: address.latitude || null,
        longitude: address.longitude || null,
    };
}

//   type AddressCreateWithoutOrderBillingAddressInput = {
//     firstName: string;
//     lastName: string;
//     address1: string;
//     address2?: string | null;
//     city: string;
//     province: string;
//     provinceCode: string;
//     country: string;
//     countryCode: string;
//     postalCode: string;
//     phone?: string | null;
//     latitude?: number | null;
//     longitude?: number | null;
//   };

