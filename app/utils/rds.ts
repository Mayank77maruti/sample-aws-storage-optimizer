import { Client } from "pg";
import * as dotenv from "dotenv";
dotenv.config();

const client = new Client({
  host: "database-1.cn64k84iqhmx.ap-south-1.rds.amazonaws.com",
  port: 5432,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  ssl: {
    rejectUnauthorized: false,
  },
});

export const checkTableExistsRds = async (tableName: string) => {
  try {
    console.log("in");
    await client.connect();
    console.log("connected");
    const query = `
      SELECT * FROM "Seller";
    `;
    const res = await client.query(query);
    console.log(res);
    const exists = res.rows[0].exists;

    if (exists) {
      console.log("Table already exists");
    } else {
    //   await createUserTable();
      console.log("User table created");
    }
  } catch (error) {
    console.error("Error checking or creating table:", error);
  } finally {
    await client.end();
  }
};
