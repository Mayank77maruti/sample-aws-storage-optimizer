import { CreateTableCommand, DescribeTableCommand, DynamoDBClient } from "@aws-sdk/client-dynamodb";
import * as dotenv from "dotenv";
dotenv.config();

export const client = new DynamoDBClient({
    region: 'ap-south-1',
    credentials: {
        
    }
});


export const checkTableExists = async(name: string) => {
    try {
        const command = new DescribeTableCommand({ TableName: name });
        const response = await client.send(command);
        console.log(response);
        console.log("Table already exists");
    } catch (err) {
        console.log(err)
        if(name === 'User'){
            await createUserTable();
        }
        console.log("User table created");
    }
}

const createUserTable = async () => {
    const command = new CreateTableCommand({
      TableName: "User",
      KeySchema: [
        { AttributeName: "id", KeyType: "HASH" },
        { AttributeName: "email", KeyType: "RANGE" },
      ],
      AttributeDefinitions: [
        { AttributeName: "id", AttributeType: "S" },
        { AttributeName: "email", AttributeType: "S" },
      ],
      ProvisionedThroughput: {
        ReadCapacityUnits: 1,
        WriteCapacityUnits: 1,
      },
    });
  
    const response = await client.send(command);
    console.log(response);
    return response;
};