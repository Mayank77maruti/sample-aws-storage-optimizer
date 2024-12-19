"use server";

import { PrismaClient } from "@prisma/client";
import { authenticatedUser } from '@/app/utils/amplify-server-utils';
import { NextRequest, NextResponse } from "next/server";
// import { cookies } from "next/headers";
import { serialize } from 'cookie';
import axios from "axios";

const prisma = new PrismaClient();

export async function createUser(formData: { id?: string; email: string; name: string }) {
  console.log("formData: ", formData);

  try {
    // Create the user in the database
    const userId = String(formData.id);
    const user = await prisma.seller.upsert({
      where: {
        email: formData.email, 
      },
      create: {
        userId: userId, // Data to create if no record is found
        email: formData.email,
        name: formData.name,
      },
      update: {
        email: formData.email, // Data to update if the record exists
        name: formData.name,
      },
    });

    // await axios.get('/api/sellerId');
    const cookieOptions:any = {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'Lax',
      path: '/',
    };

    const cookieString = serialize('user', user.email, cookieOptions); // You can set other user info here too

    const response = NextResponse.json({ success: true, response: user });
    response.headers.set('Set-Cookie', cookieString);

    console.log("User created: ", user);
    return { success: true, response: user };
  } catch (error) {
    console.error("Unable to create user entry: ", error);
    return { success: false, error };
  } finally {
    // Disconnect the Prisma Client after use
    await prisma.$disconnect();
  }
}