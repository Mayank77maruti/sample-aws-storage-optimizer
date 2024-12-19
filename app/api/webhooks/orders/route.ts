import Shopify from "@/lib/shopify";
import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import { PrismaClient, Prisma } from '@prisma/client';
const prisma = new PrismaClient();
import { extractOrderDetails, sendCustomerEmail } from "@/app/utils/mailer";

// Specify runtime for the route
export const runtime = "nodejs";

// POST handler for Shopify webhook
export async function POST(req: NextRequest) {
  console.log("Incoming Webhook");

  try {
    // Parse the raw body from the request
    // console.log(req);
    const rawBody = await req.text();
    // const parsedData = JSON.parse(rawBody);

    // Validate the webhook
    const { valid } = await Shopify.webhooks.validate({
      rawBody,
      rawRequest: req,
      rawResponse: NextResponse,
    });
    // console.log(valid,"orders");
    console.log('rawbody', rawBody);
    const parsedData = await JSON.parse(rawBody);
    console.log(parsedData);


    // await axios.post("https://ed14-2401-4900-3dcd-a146-f8-a162-9ac3-e622.ngrok-free.app/api/fucwebhook/order", rawBody);
    // await axios.post("https://ed14-2401-4900-3dcd-a146-f8-a162-9ac3-e622.ngrok-free.app/api/fucwebhook/lowreturn", rawBody);

    // Dynamically construct the base URL
    const protocol = req.headers.get("x-forwarded-proto") || "http";
    const host = req.headers.get("host");
    const baseUrl = `${protocol}://${host}`;

    // console.log("Base URL:", baseUrl);
    const contentType = req.headers.get('content-type');
    console.log('Content-Type:', contentType);
    if (contentType !== 'application/json') {
      throw new Error('Invalid content type');
    }


    if (baseUrl && parsedData) {
      console.log('parseddataif con',parsedData)
      console.log('if condition', baseUrl);
      await extractOrderDetails(parsedData, baseUrl);
    }


    if (!valid) {
      console.error("Invalid webhook call");
      return NextResponse.json(
        { error: "Invalid webhook call" },
        { status: 400 }
      );
    }
    // console.log(valid);

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
