// import { type NextRequest, NextResponse } from "next/server";
// import { authenticatedUser } from "@/app/utils/amplify-server-utils";
// import { cookies } from "next/headers";

// export async function middleware(request: NextRequest) {
//   const response = NextResponse.next();
//   const user = await authenticatedUser({ request, response });
//   // console.log(user);

//   const userJson = JSON.stringify(user);
//   (await cookies()).set("onestop_vyapar_user", userJson);

//   const isOnDashboard = request.nextUrl.pathname.startsWith("/dashboard");
//   const isOnAdminArea =
//     request.nextUrl.pathname.startsWith("/dashboard/admins");

//   if (isOnDashboard) {
//     // console.log("user");
//     if (!user) {
//       return NextResponse.redirect(new URL("/auth/login", request.nextUrl));
//     }

//     if (isOnAdminArea && !user.isAdmin) {
//       // console.log("not admin");
//       return NextResponse.redirect(new URL("/dashboard", request.nextUrl));
//     }
//   }

//   if (user && !request.nextUrl.pathname.startsWith("/dashboard")) {
//     return NextResponse.redirect(new URL("/dashboard", request.nextUrl));
//   }

//   return response;
// }

// export const config = {
//   /*
//    * Match all request paths except for the ones starting with
//    */
//   matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
// };

// import { type NextRequest, NextResponse } from "next/server";
// import { authenticatedUser } from "@/app/utils/amplify-server-utils";
// import { cookies } from "next/headers";

// export async function middleware(request: NextRequest) {
//   const response = NextResponse.next();
//   const user = await authenticatedUser({ request, response });
//   // console.log(user);

//   // const userJson = JSON.stringify(user);
//   // (await cookies()).set("onestop_vyapar_user", userJson);
//   if (user) {
//     const userJson = JSON.stringify(user); // Convert user object to JSON

//     // Set the cookie with user information
//     response.cookies.set("onestop_vyapar_user", userJson, {
//       httpOnly: true,
//       secure: process.env.NODE_ENV === "production", // Ensure it's secure in production
//       path: "/",
//       sameSite: "strict",
//     });

//   }

//   const isOnDashboard = request.nextUrl.pathname.startsWith("/dashboard");
//   const isOnAdminArea =
//     request.nextUrl.pathname.startsWith("/dashboard/admins");

//   if (isOnDashboard) {
//     console.log("user");
//     if (!user){
//       return NextResponse.redirect(new URL("/auth/login", request.nextUrl));
//     }

//     if (isOnAdminArea && !user.isAdmin){
//       console.log("not admin");
//       return NextResponse.redirect(new URL("/dashboard", request.nextUrl));
//     }
//   }

//   if (user && !request.nextUrl.pathname.startsWith("/dashboard")) {
//     return NextResponse.redirect(new URL("/dashboard", request.nextUrl));
//   }

//   return response;
// }

// export const config = {
//   /*
//    * Match all request paths except for the ones starting with
//    */
//   matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
// };

import { type NextRequest, NextResponse } from "next/server";
import { authenticatedUser } from "@/app/utils/amplify-server-utils";
import { cookies } from "next/headers";

// Token verification function
const verifyAccessToken = (token: string): boolean => {
  // Replace with actual token validation logic (e.g., JWT verification)
  return token === 'your-secure-token'; // Example for illustration
};

export async function middleware(request: NextRequest) {
  const response = NextResponse.next();
  
  // Access token validation for API routes under /api/endpoints
  // if (request.nextUrl.pathname.startsWith("/api/endpoints")) {
  //   const token = request.headers.get("authorization_");

  //   if (!token) {
  //     return NextResponse.json({ error: "Unauthorized: Access token missing" }, { status: 401 });
  //   }

  //   const isValid = verifyAccessToken(token);

  //   if (!isValid) {
  //     return NextResponse.json({ error: "Unauthorized: Invalid access token" }, { status: 403 });
  //   }

  //   return response; // Allow API request to proceed if token is valid
  // }

  // Authentication logic for non-API routes
  const user = await authenticatedUser({ request, response });

  if (user) {
    const userJson = JSON.stringify(user); // Convert user object to JSON
    await response.cookies.set("onestop_vyapar_user", userJson, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // Ensure secure cookies in production
      path: "/",
      sameSite: "strict",
    });
    const auth = request.nextUrl.pathname.startsWith("/auth");
    if(auth)
    {
      return NextResponse.redirect(new URL("/dashboard", request.nextUrl));
    }
    
  }

  const isOnDashboard = request.nextUrl.pathname.startsWith("/dashboard");
  const isOnAdminArea = request.nextUrl.pathname.startsWith("/dashboard/admins");

  if (isOnDashboard) {
    // const userJson = JSON.stringify(user);
    const host = request.nextUrl.hostname

    response.cookies.set("HOST", host, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // Ensure secure cookies in production
      path: "/",
      sameSite: "lax",
    });
    if (!user) {
      return NextResponse.redirect(new URL("/auth/login", request.nextUrl));
    }

    if (isOnAdminArea && !user.isAdmin) {
      return NextResponse.redirect(new URL("/dashboard", request.nextUrl));
    }
  }

  // if (user && !request.nextUrl.pathname.startsWith("/dashboard")) {
  //   return NextResponse.redirect(new URL("/dashboard", request.nextUrl));
  // }

  return response;
}

export const config = {
  /*
   * Match all request paths
   * Middleware is applied to:
   * - `/dashboard` and admin routes for authentication
   * - `/api/endpoints` for access token validation
   */
  matcher: [
    "/((?!api|_next/static|_next/image|.*\\.png$).*)", // Non-API routes
    // "/api/endpoints/:path*", // Secure API routes
  ],
};
