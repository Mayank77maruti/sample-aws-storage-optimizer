// import Shopify from "@/lib/shopify";
// import { ApiRequest, NextApiResponse } from "@/@types";
// import { NextResponse } from "next/server";

// export const POST = async (req: ApiRequest, res: NextApiResponse) => {

//     console.log('Incoming Webhook')
//     if (req.method === "POST") {
//         try {
//             console.log('enter');

//             // const {valid, topic, domain} = await Shopify.webhooks.validate({
//             //     rawBody: req.body, // is a string
//             //     rawRequest: req,
//             //     rawResponse: res,
//             //   });
//               await Shopify.webhooks.process({
//                 rawBody: req.body, // is a string
//                 rawRequest: req,
//                 rawResponse: res,
//               });
//             // if(req==process.env.SHOP)
//             // await Shopify.rest.Webhook.process(req, res)
//             // await Shopify.webhooks.process({
//             //     rawBody: req.body,
//             //     rawHeaders: req.headers,
//             //     requestContext: req,
//             // });

//             console.log(`Webhook processed, returned status code 200`);
//             return new NextResponse("Internal error", { status: 200 });
//         } catch (error) {
//             console.log(`Failed to process webhook: ${error}`);
//             return new NextResponse("Internal error", { status: 400 });
            
//         }
//     } else {
//         res.status(403).send("Only POST is allowed")
//     }
// }

// export const config = {
//     api: {
//         bodyParser: false,
//     },
// }
// import Shopify from "@/lib/shopify";
// import { ApiRequest, NextApiResponse } from "@/@types";
// // import getRawBody from 'raw-body';
// import { NextResponse } from "next/server";
// // import bodyParser from 'body-parser';

// export const POST = async (req:any, res: NextApiResponse) => {
//     console.log('Incoming Webhook');
//     if (req.method === "POST") {
//         try {
//             console.log('enter');
//             const rawBody = await req.text();

//             const {valid} = await Shopify.webhooks.validate({
//               rawBody: rawBody, // is a string
//               rawRequest: req,
//               rawResponse: res,
//             });
          
//             if (!valid) {
//               // console.error('Invalid webhook call, not handling it');
//               // res.send(400); // Bad Request
//               return new NextResponse("Invalid webhook call, not handling it", { status: 400 });
//             }
            
//             await Shopify.webhooks.process({
//                 rawBody: rawBody,
//                 rawRequest: req,
//                 rawResponse: res,
//             });
//             console.log(`Webhook processed, returned status code 200`);
//             return new NextResponse("Internal error", { status: 200 });
//             // res.status(200).end();
//         } catch (error) {
//             console.error(`Failed to process webhook: ${error}`);
//             return new NextResponse("Failed to process webhook:", { status: 500 });
//             // res.status(500).send(`Failed to process webhook: ${error}`);
//         }
//     } else {
//         return new NextResponse("Only POST is allowed", { status: 403 });
//         // res.status(403).send("Only POST is allowed");
//     }
// };

// // export const config = {
// //     api: {
// //         bodyParser: false,
// //     },
// // };
// // pages/api/webhooks.ts

import Shopify from "@/lib/shopify";
import { NextRequest, NextResponse } from "next/server";

// Specify runtime for the route
export const runtime = "nodejs";

// POST handler for Shopify webhook
export async function POST(req: NextRequest) {
  console.log("Incoming Webhook");

  try {
    // Parse the raw body from the request
    const rawBody = await req.text();

    // Validate the webhook
    const { valid } = await Shopify.webhooks.validate({
      rawBody,
      rawRequest: req,
      rawResponse: NextResponse,
    });

    if (!valid) {
      console.error("Invalid webhook call");
      return NextResponse.json(
        { error: "Invalid webhook call" },
        { status: 400 }
      );
    }
    console.log(valid);

    // Process the webhook
    await Shopify.webhooks.process({
      rawBody,
      rawRequest: req,
      rawResponse: NextResponse,
    });

    console.log("Webhook processed successfully");
    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error(`Failed to process webhook: ${error}`);
    return NextResponse.json(
      { error: "Failed to process webhook" },
      { status: 500 }
    );
  }
}
