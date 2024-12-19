import Shopify from "@/lib/shopify";
import { ApiRequest, NextApiResponse } from "@/@types";
import { NextRequest, NextResponse } from "next/server";
import { serialize } from 'cookie';
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();


export const GET = async (req: Request, res: NextApiResponse) => {
  try {
    const callback = await Shopify.auth.callback({
      rawRequest: req,
      rawResponse: res,
    });

    const { session } = callback;

    console.log(session, "session");

    if (!session || !session.accessToken) {
      throw new Error("Could not validate auth callback");
    }
    


    const cookies = req.headers.get('cookie'); // Ensure you are accessing the correct header

    if (!cookies) {
      return new NextResponse("Missing cookies", { status: 403 });
    }

    // Parse cookies into an object
    const parsedCookies = Object.fromEntries(
      cookies.split('; ').map(c => {
        const [key, value] = c.split('=');
        return [key, decodeURIComponent(value)];
      })
    );

    // console.log(parsedCookies);
    
    let HOST = 'localhost'; // Default value for HOST
    if (parsedCookies.HOST === 'localhost') {
      // Your logic here
      HOST = process.env.HOST || 'default-host-value'; // Fallback for environment variable
    }




    const SellerId = parsedCookies.SellerId;

    if (!SellerId) {
      return new NextResponse("Seller ID is required", { status: 406 });
    }

    const updatesession = await prisma.session.upsert({
      where: {
        sellerId: String(SellerId), // Ensure SellerId is a string
      },
      update: {
        accessToken: session.accessToken, // Update with the new token value
      },
      create: {
        Seller: { connect: { id: SellerId } }, // Create new session if one doesn't exist for this seller
        accessToken: session.accessToken, // Set initial token if creating a new session

      },
    });



    const result = await Shopify.webhooks.register({
      session: session,
    });

    // console.log('webhook');
    console.log(result);
    // const baseURL = process.env.HOST || 'http://localhost:3000';
    // const sellerId = await fetch(`http://${baseURL}/api/sellerId`, {
    //   method: 'GET',
    //   // credentials: 'include', // Include cookies in the request
    // });

    


    const response = NextResponse.redirect(`https://${HOST}`, { status: 302 });
    console.log(response, "response");
    
    return response;
    // return NextResponse.json(
    //   { success: true, accessToken: session.accessToken },
    //   { status: 200 }
    // );
  } catch (error) {
    console.error(error);
    return new Response('Error during authentication', { status: 500 });
  }
}




