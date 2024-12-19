// 'use client';

// import { Card } from "@/components/ui/card";
// import {
//   ShoppingCart,
//   Package,
//   AlertCircle,
//   TrendingUp,
// } from "lucide-react";
// import { useOrders } from "@/hooks/use-orders";
// import { useInventory } from "@/hooks/use-inventory";
// import { useRouter } from "next/navigation";

// export default function Home() {
//   const { orders } = useOrders();
//   const { inventory } = useInventory();
//   const router = useRouter();

//   const stats = {
//     totalOrders: orders?.length || 0,
//     fulfilledOrders: orders?.filter(order => order.status === 'fulfilled').length || 0,
//     pendingOrders: orders?.filter(order => order.status === 'pending').length || 0,
//     revenue: orders?.reduce((acc, order) => acc + order.total, 0) || 0,
//   };

//   const handelShopify = async () => {
//     router.push('/dashboard/shopify/');
//   };

//   return (
//     <div className="p-4 sm:p-6 md:p-8">
//       <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-6">Dashboard</h2>
//       <button
//         className="p-2 rounded-md bg-slate-700 text-white font-semibold mb-4 flex items-center gap-2 transition duration-200 hover:bg-slate-600 hover:scale-105"
//         onClick={handelShopify}
//       >
//         <img
//           src="/shopify.svg"
//           alt="Shopify Logo"
//           className="h-6 w-6 transition duration-200 hover:scale-110"
//         />
//         Connect Shopify
//       </button>

//       <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
//         <Card className="p-6">
//           <div className="flex items-center gap-4">
//             <ShoppingCart className="h-8 w-8 text-blue-500" />
//             <div>
//               <p className="text-sm text-muted-foreground">Total Orders</p>
//               <h3 className="text-xl sm:text-2xl font-bold">{stats.totalOrders}</h3>
//             </div>
//           </div>
//         </Card>

//         <Card className="p-6">
//           <div className="flex items-center gap-4">
//             <Package className="h-8 w-8 text-green-500" />
//             <div>
//               <p className="text-sm text-muted-foreground">Fulfilled Orders</p>
//               <h3 className="text-xl sm:text-2xl font-bold">{stats.fulfilledOrders}</h3>
//             </div>
//           </div>
//         </Card>

//         <Card className="p-6">
//           <div className="flex items-center gap-4">
//             <AlertCircle className="h-8 w-8 text-yellow-500" />
//             <div>
//               <p className="text-sm text-muted-foreground">Pending Orders</p>
//               <h3 className="text-xl sm:text-2xl font-bold">{stats.pendingOrders}</h3>
//             </div>
//           </div>
//         </Card>

//         <Card className="p-6">
//           <div className="flex items-center gap-4">
//             <TrendingUp className="h-8 w-8 text-purple-500" />
//             <div>
//               <p className="text-sm text-muted-foreground">Revenue</p>
//               <h3 className="text-xl sm:text-2xl font-bold">₹{stats.revenue.toFixed(2)}</h3>
//             </div>
//           </div>
//         </Card>
//       </div>

//       <div className="mt-8">
//         <h3 className="text-lg sm:text-xl font-semibold mb-4">Recent Orders</h3>
//         <Card className="p-6">
//           {orders ? (
//             <div className="space-y-4">
//               {orders.slice(0, 5).map((order) => (
//                 <div
//                   key={order.id}
//                   className="flex flex-wrap justify-between items-center gap-2"
//                 >
//                   <div>
//                     <p className="font-medium">{order.customer.name}</p>
//                     <p className="text-sm text-muted-foreground">{order.id}</p>
//                   </div>
//                   <div className="text-right">
//                     <p className="font-medium">₹{order.total.toFixed(2)}</p>
//                     <p className="text-sm text-muted-foreground">{order.status}</p>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           ) : (
//             <div className="text-sm text-muted-foreground">
//               Loading recent orders...
//             </div>
//           )}
//         </Card>
//       </div>
//     </div>
//   );
// }


'use client';

import { Card } from "@/components/ui/card";
import {
  ShoppingCart,
  Package,
  AlertCircle,
  TrendingUp,
  NotepadText,
  Sparkle,
  CircleX,
  Truck,
  
} from "lucide-react";
import {
  
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { RecentSales } from "@/components/recent-sales";
import { Overview } from "@/components/overview-chart";

import { useOrders } from "@/hooks/use-orders";
import { useRouter } from "next/navigation";


export default function Home() {
  const { orders } = useOrders();
  const router = useRouter();



  const stats = {
    totalOrders: orders?.length || 0,
    fulfilledOrders: orders?.filter(order => order.status === 'fulfilled').length || 0,
    pendingOrders: orders?.filter(order => order.status === 'pending').length || 0,
    revenue: orders?.reduce((acc, order) => acc + order.total, 0) || 0,
  };

  const handelShopify = async () => {
    router.push('/dashboard/shopify/');
  };

  return (
    <div className="relative">
      

      {/* Main Content */}
      <div className="md:ml-17 ml-3 mt-5">
       

        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-6">Dashboard</h2>

         
        <button
          className="p-2 rounded-md bg-slate-700 text-white font-semibold mb-8 flex items-center gap-2 transition duration-200 hover:bg-slate-600 hover:scale-105"
          onClick={handelShopify}
        >
          <img
            src="/shopify.svg"
            alt="Shopify Logo"
            className="h-6 w-6 transition duration-200 hover:scale-110"
          />
          Connect Shopify
        </button>

        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          <Card className="p-6">
            <div className="flex items-center gap-4">
              <ShoppingCart className="h-8 w-8 text-blue-500" />
              <div>
                <p className="text-sm text-muted-foreground">Total Orders</p>
                <h3 className="text-xl sm:text-2xl font-bold">{stats.totalOrders}</h3>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center gap-4">
              <Package className="h-8 w-8 text-green-500" />
              <div>
                <p className="text-sm text-muted-foreground">Fulfilled Orders</p>
                <h3 className="text-xl sm:text-2xl font-bold">{stats.fulfilledOrders}</h3>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center gap-4">
              <AlertCircle className="h-8 w-8 text-yellow-500" />
              <div>
                <p className="text-sm text-muted-foreground">Pending Orders</p>
                <h3 className="text-xl sm:text-2xl font-bold">{stats.pendingOrders}</h3>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center gap-4">
              <TrendingUp className="h-8 w-8 text-purple-500" />
              <div>
                <p className="text-sm text-muted-foreground">Revenue</p>
                <h3 className="text-xl sm:text-2xl font-bold">₹{stats.revenue.toFixed(2)}</h3>
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* ------------------------------------------------------------------------------------------------ */}
      
      <div>
      <div className="flex flex-wrap lg:flex-nowrap justify-between mt-10 my-6 mb-10 w-full h-auto">
  {/* Left half with 4 cards */}
  <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 w-full lg:w-1/2 ml-4">
    <Card className="p-6 sm:p-8 md:p-10 w-full bg-black">
      <div className="flex items-center gap-4">
        <NotepadText className="h-8 w-8 text-white" />
        <div>
          <p className="text-sm text-muted-foreground text-white">Invoiced</p>
          <h3 className="text-xl sm:text-2xl font-bold text-white">10</h3>
        </div>
      </div>
    </Card>

    <Card className="p-6 sm:p-8 md:p-10 w-full">
      <div className="flex items-center gap-4">
        <Truck className="h-8 w-8" />
        <div>
          <p className="text-sm text-muted-foreground">Out for delivery</p>
          <h3 className="text-xl sm:text-2xl font-bold">{stats.fulfilledOrders}</h3>
        </div>
      </div>
    </Card>

    <Card className="p-6 sm:p-8 md:p-10 w-full">
      <div className="flex items-center gap-4">
        <CircleX className="h-8 w-8" />
        <div>
          <p className="text-sm text-muted-foreground">Cancelled</p>
          <h3 className="text-xl sm:text-2xl font-bold">2</h3>
        </div>
      </div>
    </Card>

    <Card className="p-6 sm:p-8 md:p-10 w-full bg-purple-200">
      <div className="flex items-center gap-4">
        <Sparkle className="h-8 w-8" />
        <div>
          <p className="text-sm text-muted-foreground align-middle mt-4 font-semibold text-black">AI Suggestions</p>
        </div>
      </div>
    </Card>
  </div>

  {/* Right side with a single box */}
  <div className="w-full lg:w-1/2 mt-6 lg:mt-0 ml-2">
    <div className="grid gap-4">
      <Card>
        <CardHeader>
          <CardTitle>Overview</CardTitle>
        </CardHeader>
        <CardContent className="pl-2">
          <Overview />
        </CardContent>
      </Card>
    </div>
  </div>
</div>

        
        </div>









      <div className="mt-[3vh]">
       <h3 className="text-lg sm:text-xl font-semibold mb-4 px-5">Recent Orders</h3>
         <Card className="p-6">
           {orders ? (
            <div className="space-y-4">
              {orders.slice(0, 5).map((order) => (
                <div
                  key={order.id}
                  className="flex flex-wrap justify-between items-center gap-2"
                >
                  <div>
                    <p className="font-medium">{order.customer.name}</p>
                    <p className="text-sm text-muted-foreground">{order.id}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">₹{order.total.toFixed(2)}</p>
                    <p className="text-sm text-muted-foreground">{order.status}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-sm text-muted-foreground">
              Loading recent orders...
            </div>
          )}
        </Card>
      </div>

     
      

     
    </div>
  );
}
