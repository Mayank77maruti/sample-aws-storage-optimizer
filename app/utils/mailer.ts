import { PinpointClient, SendMessagesCommand } from "@aws-sdk/client-pinpoint";
import axios from "axios";

// Initialize the Pinpoint client
const client = new PinpointClient({
  region: "ap-south-1",
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_KEY_ID,
  }
});

export async function sendLowstockMail(emailTo: string, subject: string, seller_name: string, product_name: string, product_quantity: number) {
  const applicationId = process.env.PINPOINT_PROJECT_ID;
  const params = {
    ApplicationId: applicationId,
    MessageRequest: {
      Addresses: {
        [emailTo]: {
          ChannelType: "EMAIL",
        },
      },
      MessageConfiguration: {
        EmailMessage: {
          FromAddress: "thetechnova023@gmail.com",
          SimpleEmail: {
            Subject: { Data: subject },
            HtmlPart: {
              Data: `
                <!DOCTYPE html>
                <html lang="en">
                <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <style>
                        body {
                            font-family: Arial, sans-serif;
                            background-color: #f9f9f9;
                            margin: 0;
                            padding: 0;
                        }
                        .email-container {
                            width: 100%;
                            max-width: 600px;
                            margin: 20px auto;
                            background-color: #ffffff;
                            border-radius: 8px;
                            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
                            overflow: hidden;
                        }
                        .header {
                            background-color: #0077cc;
                            color: #ffffff;
                            padding: 20px;
                            text-align: center;
                        }
                        .header h1 {
                            margin: 0;
                            font-size: 24px;
                        }
                        .content {
                            padding: 20px;
                            color: #333333;
                            line-height: 1.6;
                        }
                        .content h2 {
                            margin-top: 0;
                            color: #0077cc;
                        }
                        .cta {
                            text-align: center;
                            margin: 20px 0;
                        }
                        .cta a {
                            background-color: #0077cc;
                            color: #ffffff;
                            text-decoration: none;
                            padding: 10px 20px;
                            border-radius: 5px;
                            font-size: 16px;
                        }
                        .cta a:hover {
                            background-color: #005fa3;
                        }
                        .footer {
                            background-color: #f1f1f1;
                            color: #666666;
                            text-align: center;
                            padding: 10px;
                            font-size: 12px;
                        }
                    </style>
                </head>
                <body>
                    <div class="email-container">
                        <!-- Header -->
                        <div class="header">
                            <h1>Low Stock Alert</h1>
                        </div>
                        <!-- Content -->
                        <div class="content">
                            <h2>Hi${seller_name},</h2>
                            <p>We wanted to let you know that one of your sellable items is running low on stock:</p>
                            <p><strong>Item:</strong> ${product_name}</p>
                            <p><strong>Remaining Stock:</strong> ${product_quantity}</p>
                            <p>Don't miss out! Secure your item before it's gone.</p>
                        </div>
                        
                        <!-- Footer -->
                        <div class="footer">
                            <p>You are receiving this email because you subscribed to Onestop Vyapaar</p>
                            <p>If you no longer wish to receive these emails, you can <a href="[Unsubscribe Link]">unsubscribe here</a>.</p>
                        </div>
                    </div>
                </body>
                </html>
            `,
            },
            TextPart: { Data: "" },
          },
        },
      },
    },
  };

  try {
    const command = new SendMessagesCommand(params);
    const response = await client.send(command);
    console.log("Email sent successfully:", response);
  } catch (error) {
    console.error("Error sending email:", error);
  }
}

// Define the OrderDetails interface
interface OrderDetails {
  topic: string;
  shop: string;
  orderId: number;
  orderName: string;
  totalPrice: string;
  currency: string;
  customerEmail: string;
  customerName: string;
  customerAddress: string;
  lineItems: Array<{
    name: string;
    quantity: number;
    price: string;
  }>;
}

// Function to extract order details from rawData
export async function extractOrderDetails(rawData: any,baseUrl:any): Promise<OrderDetails> {
  // Parse the `body` field
  // console.log('enter');
  // console.log(baseUrl,rawData);
  const body = rawData;
  // console.log('Baseextract',baseUrl);

  // Extract customer details
  const customer = body.customer || {};
  const customerName = `${customer.first_name || ""} ${customer.last_name || ""}`.trim();
  const defaultAddress = customer.default_address || {};
  const customerAddress = `${defaultAddress.address1 || ""}, ${defaultAddress.city || ""}, ${defaultAddress.province || ""}, ${defaultAddress.country || ""}`.trim();

  // Extract line items
  const lineItems = body.line_items.map((item: any) => ({
    name: item.name,
    quantity: item.quantity,
    price: item.price,
    productId: item.variant_id || null,
  }));
  // console.log(lineItems,'lineitems');

  // Send an email notification
  const emailSubject = `Order Confirmation - ${body.name}`;
  const firstLineItem = lineItems[0]; // Assume email is about the first product in the order
  await sendCustomerEmail(
    body.email,
    emailSubject,
    customerName,
    firstLineItem.name,
    firstLineItem.quantity
  );
  async function fetchSellerDetails(productId: string,baseUrl:any) {
    // console.log(baseUrl,"fetchseller");
    console.log(productId,'productid');
    const response = await fetch(`${baseUrl}/api/sellermail`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ productId }),
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch seller details: ${response.statusText}`);
    }

    return response.json();
  }


  try {
    const seller = await fetchSellerDetails(firstLineItem.productId,baseUrl);

    if (!seller || !seller.email) {
      throw new Error('Seller email not found');
    }


    // Send low-stock email notification
    const emailSubject = `Low Stock Alert for ${firstLineItem.name}`;
    await sendLowstockMail(
      seller.email,        // Seller's email
      emailSubject,        // Email subject
      seller.name,         // Seller's name
      firstLineItem.name,  // Product name
      firstLineItem.quantity // Product quantity
    );
  } catch (error) {
    console.error('Error retrieving seller details or sending email:', error);
  }



  // Return the extracted details
  return {
    topic: rawData.topic,
    shop: rawData.shop,
    orderId: body.id,
    orderName: body.name,
    totalPrice: body.total_price,
    currency: body.currency,
    customerEmail: body.email || "",
    customerName,
    customerAddress,
    lineItems,
  };
}

// Function to send customer email notifications
export async function sendCustomerEmail(
  emailTo: string,
  subject: string,
  sellerName: string,
  productName: string,
  productQuantity: number
) {
  const applicationId = process.env.PINPOINT_PROJECT_ID;

  const params = {
    ApplicationId: applicationId,
    MessageRequest: {
      Addresses: {
        [emailTo]: {
          ChannelType: "EMAIL",
        },
      },
      MessageConfiguration: {
        EmailMessage: {
          FromAddress: "thetechnova023@gmail.com",
          SimpleEmail: {
            Subject: { Data: subject },
            HtmlPart: {
              Data: `
                <!DOCTYPE html>
                <html lang="en">
                <head>
                  <meta charset="UTF-8">
                  <meta name="viewport" content="width=device-width, initial-scale=1.0">
                  <style>
                    body {
                      font-family: Arial, sans-serif;
                      background-color: #f9f9f9;
                      margin: 0;
                      padding: 0;
                    }
                    .email-container {
                      max-width: 600px;
                      margin: 20px auto;
                      background-color: #ffffff;
                      border-radius: 8px;
                      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
                      overflow: hidden;
                    }
                    .header {
                      background-color: #0077cc;
                      color: #ffffff;
                      padding: 20px;
                      text-align: center;
                    }
                    .header h1 {
                      margin: 0;
                      font-size: 24px;
                    }
                    .content {
                      padding: 20px;
                      color: #333333;
                      line-height: 1.6;
                    }
                    .content h2 {
                      margin-top: 0;
                      color: #0077cc;
                    }
                    .footer {
                      background-color: #f1f1f1;
                      color: #666666;
                      text-align: center;
                      padding: 10px;
                      font-size: 12px;
                    }
                  </style>
                </head>
                <body>
                  <div class="email-container">
                    <!-- Header -->
                    <div class="header">
                      <h1>Order Confirmation</h1>
                    </div>
                    <!-- Content -->
                    <div class="content">
                      <h2>Hello ${sellerName},</h2>
                      <p>Thank you for your order! Here are your order details:</p>
                      <p><strong>Product:</strong> ${productName}</p>
                      <p><strong>Quantity:</strong> ${productQuantity}</p>
                      <p>We will notify you once your order is shipped.</p>
                    </div>
                    <!-- Footer -->
                    <div class="footer">
                      <p>You are receiving this email as part of your order confirmation.</p>
                      <p>If you have any questions, please contact our support team.</p>
                    </div>
                  </div>
                </body>
                </html>
              `,
            },
            TextPart: { Data: `Hello ${sellerName},\n\nThank you for your order. Your product "${productName}" (Quantity: ${productQuantity}) will be processed shortly.\n\nRegards,\nOnestop Vyapaar` },
          },
        },
      },
    },
  };

  try {
    const command = new SendMessagesCommand(params);
    const response = await client.send(command);
    console.log("Email sent successfully:", response);
  } catch (error) {
    console.error("Error sending email:", error);
  }
}

// Example usage
// const rawData = {
//   topic: "ORDERS_CREATE",
//   shop: "quickstart-64fd9d6b.myshopify.com",
//   body: '{"id":5762269610149,"name":"#1012","total_price":"238.47","currency":"EUR","email":"anshumanrishi27@gmail.com","customer":{"first_name":"test","last_name":"test","default_address":{"address1":"vara","city":"Varanasi","province":"Uttar Pradesh","country":"India"}},"line_items":[{"name":"Bramhand","quantity":3,"price":"74.99"}]}',
// };
// const baseUrl = "https://example.com";

// extractOrderDetails(rawData, baseUrl).then((orderDetails) => {
//   console.log(orderDetails);
// });
