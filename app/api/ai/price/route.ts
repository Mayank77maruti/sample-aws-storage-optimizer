// import { NextResponse ,NextRequest} from 'next/server';

// export async function POST(request: NextRequest) {
//     console.log('enter');
//     const body = await request.json();
//     try {
//         // Hardcoded data to send to AWS API Gateway
//         const apiGatewayBody = {
//           body: JSON.stringify({
//             item_id: 'ITEM9999',
//             city: 'ExampleCity',
//             date: '2024-07-15',
//             quantity: 50,
//             category: 'Electronics',
//           }),
//         };
    
//         // Make the POST request to AWS API Gateway
//         const awsResponse = await fetch(
//           'https://vv95n14v36.execute-api.ap-south-1.amazonaws.com/pd/dev',
//           {
//             method: 'POST',
//             headers: {
//               'Content-Type': 'application/json',
//             },
//             body: JSON.stringify(apiGatewayBody),
//           }
//         );
    
//         // Handle API Gateway response
//         if (!awsResponse.ok) {
//           return NextResponse.json(
//             { error: 'Failed to fetch data from AWS API Gateway' },
//             { status: awsResponse.status }
//           );
//         }
    
//         const awsData = await awsResponse.json();
//         const prediction = JSON.parse(awsData.body).prediction.trim();
    
//         // Respond back to the client
//         return NextResponse.json({ prediction });
//       } catch (error) {
//         console.error('Error communicating with AWS API Gateway:', error);
//         return NextResponse.json(
//           { error: 'Internal Server Error' },
//           { status: 500 }
//         );
//       }
  
    
//   }
  

import { NextResponse, NextRequest } from 'next/server';

export async function POST(request: NextRequest) {
  console.log('Entered POST handler');
  try {
    // Parse the request body
    const body = await request.json();
    console.log('Received request body:', body);

    // Check if `body` field exists and parse it if necessary
    const parsedBody = typeof body.body === 'string' ? JSON.parse(body.body) : body;
    console.log('Parsed body:', parsedBody);

    // Ensure the required fields are present in the parsed body
    const { item_id, city, date, category ,price} = await parsedBody;
    console.log(parsedBody);
    if (!item_id || !city || !date || !category) {
      return NextResponse.json(
        { error: 'Missing required fields in the request body' },
        { status: 400 }
      );
    }
    const quantity=50;
    const product_id =item_id;
    const sub_category = 'non-fiction' ;
    const review ='moderate' ;
    // Create the body for AWS API Gateway
    const apiGatewayBody = {
      body: JSON.stringify({ product_id, date,price,  category ,sub_category,quantity,review}),
    };
    console.log(apiGatewayBody);

    // Make the POST request to AWS API Gateway
    const awsResponse = await fetch(
      'https://knfx6gqx53.execute-api.ap-south-1.amazonaws.com/v1/dev',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(apiGatewayBody),
      }
    );

    // Handle API Gateway response
    if (!awsResponse.ok) {
      console.error('AWS API Gateway Error:', awsResponse.statusText);
      return NextResponse.json(
        { error: 'Failed to fetch data from AWS API Gateway' },
        { status: awsResponse.status }
      );
    }

    const awsData = await awsResponse.json();
    console.log('AWS Response:', awsData);

    // Parse the prediction from the AWS response
    const prediction = JSON.parse(awsData.body).prediction.trim();

    // Respond back to the client
    return NextResponse.json({ prediction });
  } catch (error) {
    console.error('Error communicating with AWS API Gateway:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
