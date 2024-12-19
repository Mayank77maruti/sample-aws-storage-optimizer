// 'use client';

// import { handleSignOut } from "@/app/actions/cognitoActions";
// import { cn } from "@/lib/utils";

// import { useState } from "react";
// import {
//   LayoutDashboard,
//   Package,
//   ShoppingCart,
//   Settings,
//   BarChart3,
//   Store,
//   LogOutIcon,
//   PackagePlus,
// } from "lucide-react";
// import Link from "next/link";
// import { usePathname, useRouter } from "next/navigation";

// const routes = [
//   {
//     label: "Dashboard",
//     icon: LayoutDashboard,
//     href: "/",
//     color: "text-sky-500",
//   },
//   {
//     label: "Orders",
//     icon: ShoppingCart,
//     href: "/dashboard/orders",
//     color: "text-violet-500",
//   },
//   {
//     label: "Inventory",
//     icon: Package,
//     href: "/dashboard/inventory",
//     color: "text-pink-700",
//   },
//   {
//     label: "Add Product",
//     icon: PackagePlus,
//     href: "/dashboard/add-product",
//     color: "text-gray-500",
//   },
//   {
//     label: "Marketplace",
//     icon: Store,
//     href: "/dashboard/marketplace",
//     color: "text-green-500",
//   },
//   {
//     label: "Analytics",
//     icon: BarChart3,
//     href: "/dashboard/analytics",
//     color: "text-orange-700",
//   },
//   {
//     label: "Settings",
//     icon: Settings,
//     href: "/dashboard/settings",
//     color: "text-gray-500",
//   },
// ];

// export function Sidebar() {
//   const pathname = usePathname();
//   const router = useRouter();

//   const handleLogout = async() => {
//     const logoutRes = await handleSignOut();

//     const logoutResObj = JSON.parse(logoutRes);
//     if(logoutResObj.success){
//       router.push('/auth/login');
//     }else{
//       console.log(logoutResObj.error);
//     }
//   }

//   const [sidebarOpen, setSidebarOpen] = useState(false); // State to toggle sidebar for small screens

//   return (
    
//      <div>

//      {/* Hamburger Menu for Small Screens -------------------------------------------------------------*/}
//      <button
//         className="p-2 md:hidden absolute top-0 right-2 z-50  text-white rounded-md"
//         onClick={() => setSidebarOpen(!sidebarOpen)}
//       >
//         {/* Hamburger Icon */}
//         <span className="block w-6 h-0.5 bg-gray-700 mb-1"></span>
//         <span className="block w-6 h-0.5 bg-gray-700 mb-1"></span>
//           <span className="block w-6 h-0.5 bg-gray-700"></span>
//         </button>

        
//       {sidebarOpen && (
//         <div className="fixed inset-0 md:hidden  bg-gray-800 text-white w-64 p-6 z-40">
//           <h1 className="text-2xl font-bold">Sidebar</h1>
//           <nav>
            
//             {/* Add Sidebar Links Here */}
//             <ul className="pt-4 space-y-4">
//       <li onClick={() => router.push('/')} className="text-gray-500 cursor-pointer">
//         Dashboard
//       </li>
//       <li onClick={() => router.push('/dashboard/orders')} className="text-gray-500 cursor-pointer">
//         Orders
//       </li>
//       <li onClick={() => router.push('/dashboard/inventory')} className="text-gray-500 cursor-pointer">
//         Inventory
//       </li>
//       <li onClick={() => router.push('/dashboard/add-product')} className="text-gray-500 cursor-pointer">
//         Add Product
//       </li>
//       <li onClick={() => router.push('/dashboard/marketplace')} className="text-gray-500 cursor-pointer">
//         Marketplace
//       </li>
//       <li onClick={() => router.push('/dashboard/analytics')} className="text-gray-500 cursor-pointer">
//         Analytics
//       </li>
//       <li onClick={() => router.push('/dashboard/settings')} className="text-gray-500 cursor-pointer">
//         Settings
//       </li>
//     </ul>
//           </nav>
//           <button
//             className="mt-4 text-sm bg-gray-700 p-1.5  rounded-sm"
//             onClick={() => setSidebarOpen(false)}
//           >
//             Close
//           </button>
//         </div>
//       )}

             
        
// {/* -------------------------------------------------------------------------------------------- */}
    
//     <div className="hidden md:flex space-y-4 \\ py-4 flex-col h-full bg-[#111827] text-white">
      

//       <div className="px-3 py-2 flex-1">
//         <Link href="/" className="flex items-center pl-3 mb-14">
//           <h1 className="text-2xl font-bold">MCF Dashboard</h1>
//         </Link>
//         <div className="space-y-1">
//           {routes.map((route) => (
//             <Link
//               key={route.href}
//               href={route.href}
//               className={cn(
//                 "text-sm group flex p-3 w-full justify-start font-medium cursor-pointer hover:text-white hover:bg-white/10 rounded-lg transition",
//                 pathname === route.href
//                   ? "text-white bg-white/10"
//                   : "text-zinc-400"
//               )}
//             >
//               <div className="flex items-center flex-1">
//                 <route.icon className={cn("h-5 w-5 mr-3", route.color)} />
//                 {route.label}
//               </div>
//             </Link>
//           ))}
//           <button className="text-sm group flex p-3 w-full justify-start font-medium cursor-pointer hover:text-white hover:bg-white/10 rounded-lg transition text-zinc-400">
//               <div className="flex items-center flex-1" onClick={async()=>await handleLogout()}>
//                 <LogOutIcon className="h-5 w-5 mr-3"/>
//                 Logout
//               </div>
//           </button>
//         </div>
//       </div>
//       </div>
//       </div>

    
//   );
// }














'use client';

import { handleSignOut } from "@/app/actions/cognitoActions";
import { cn } from "@/lib/utils";
import { useState } from "react";
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Settings,
  BarChart3,
  Store,
  LogOutIcon,
  PackagePlus,
  Gem,
  Code,
} from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

const routes = [
  {
    label: "Dashboard",
    icon: LayoutDashboard,
    href: "/dashboard",
    color: "text-sky-500",
  },
  {
    label: "Orders",
    icon: ShoppingCart,
    href: "/dashboard/orders",
    color: "text-violet-500",
  },
  {
    label: "Inventory",
    icon: Package,
    href: "/dashboard/inventory",
    color: "text-pink-700",
  },

  {
    label: "Add Product",
    icon: PackagePlus,
    href: "/dashboard/addProduct",
    color: "text-gray-500",
    
  },
  {
    label: "Analytics",
    icon: BarChart3,
    href: "/dashboard/analytics",
    color: "text-orange-700",
  },
  {
    label: "Marketplace",
    icon: Store,
    href: "/dashboard/marketplace",
    color: "text-green-500",
  },


  {
    label: "Marcketplace Seller",
    icon: Gem,
    href: "/dashboard/manufacturers",
    color: "text-pink-500",
  },
  {
    label: "Developer",
    icon: Code,
    href: "/dashboard/developer",
    color: "text-black-500",
  },
  {
    label: "Settings",
    icon: Settings,
    href: "/dashboard/settings",
    color: "text-gray-500",
  },
];

export function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    const logoutRes = await handleSignOut();

    const logoutResObj = JSON.parse(logoutRes);
    if (logoutResObj.success) {
      router.push('/auth/login');
    } else {
      console.log(logoutResObj.error);
    }
  };

  const [sidebarOpen, setSidebarOpen] = useState(false); // State to toggle sidebar for small screens

  return (
    <div>
      {/* Hamburger Menu for Small Screens -------------------------------------------------------------*/}
      <button
        className="p-2 md:hidden absolute top-0 right-2 z-50 text-white rounded-md"
        onClick={() => setSidebarOpen(!sidebarOpen)}
      >
        {/* Hamburger Icon */}
        <span className="block w-6 h-0.5 bg-gray-700 mb-1"></span>
        <span className="block w-6 h-0.5 bg-gray-700 mb-1"></span>
        <span className="block w-6 h-0.5 bg-gray-700"></span>
      </button>

      {sidebarOpen && (
        <div className="fixed inset-0 md:hidden bg-gray-800 text-white w-64 p-6 z-40">
          <h1 className="text-2xl font-bold ">Vyapaar</h1>
          <nav>
            {/* Add Sidebar Links Here */}
            <ul className="pt-4 space-y-4">
              <li
                onClick={() => {
                  router.push('/');
                  setSidebarOpen(false); // Close sidebar on click
                }}
                className="text-gray-500 cursor-pointer"
              >
                Dashboard
              </li>
              <li
                onClick={() => {
                  router.push('/dashboard/orders');
                  setSidebarOpen(false); // Close sidebar on click
                }}
                className="text-gray-500 cursor-pointer"
              >
                Orders
              </li>
              <li
                onClick={() => {
                  router.push('/dashboard/inventory');
                  setSidebarOpen(false); // Close sidebar on click
                }}
                className="text-gray-500 cursor-pointer"
              >
                Inventory
              </li>
              <li
                onClick={() => {
                  router.push('/dashboard/add-product');
                  setSidebarOpen(false); // Close sidebar on click
                }}
                className="text-gray-500 cursor-pointer"
              >
                Add Product
              </li>
              <li
                onClick={() => {
                  router.push('/dashboard/marketplace');
                  setSidebarOpen(false); // Close sidebar on click
                }}
                className="text-gray-500 cursor-pointer"
              >
                Marketplace
              </li>
              <li
                onClick={() => {
                  router.push('/dashboard/analytics');
                  setSidebarOpen(false); // Close sidebar on click
                }}
                className="text-gray-500 cursor-pointer"
              >
                Analytics
              </li>
              <li
                onClick={() => {
                  router.push('/dashboard/settings');
                  setSidebarOpen(false); // Close sidebar on click
                }}
                className="text-gray-500 cursor-pointer"
              >
                Settings
              </li>
            </ul>
          </nav>
          <button
            className="mt-4 text-sm bg-gray-700 p-1.5 rounded-sm"
            onClick={() => setSidebarOpen(false)}
          >
            Close
          </button>
        </div>
      )}

      {/* -------------------------------------------------------------------------------------------- */}

      <div className="hidden md:flex space-y-4 py-4 flex-col h-full bg-fuchsia-950 text-red-100 w-[35vh]">
        <div className="px-3 py-2 flex-1">
          <Link href="/" className="flex items-center pl-3 mb-14">
            <h1 className="text-2xl font-bold ml-[7vh]">Vyapaar</h1>
          </Link>
          <div className="space-y-1">
            {routes.map((route) => (
              <Link
                key={route.href}
                href={route.href}
                className={cn(
                  "text-sm group flex p-3 w-full justify-start font-semibold cursor-pointer hover:text-zinc-700 hover:bg-purple-200 rounded-lg transition",
                  pathname === route.href
                    ? "text-zinc-800 bg-purple-400"
                    : "text-red-100"
                )}
              >
                <div className="flex items-center flex-1">
                  <route.icon className={cn("h-5 w-5 mr-3", route.color)} />
                  {route.label}
                </div>
              </Link>
            ))}
            <button
              className="text-sm group flex p-3 w-full justify-start font-medium cursor-pointer hover:text-red-400 hover:bg-white/10 rounded-lg transition"
              onClick={async () => await handleLogout()}
            >
              <div className="flex items-center flex-1">
                <LogOutIcon className="h-5 w-5 mr-3" />
                Logout
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
