// 'use client';

// import Image from 'next/image';
// import { useState } from 'react';
// import { Inventory } from '@/lib/amazon-mcf';
// import { Button } from '@/components/ui/button';
// import { Badge } from '@/components/ui/badge';
// import {
//   Card,
//   CardContent,
//   CardFooter,
//   CardHeader,
//   CardTitle,
// } from '@/components/ui/card';
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from '@/components/ui/dialog';
// import { useToast } from '@/components/ui/use-toast';

// interface ProductCardProps {
//   product: Inventory;
// }

// export function ProductCard({ product }: ProductCardProps) {
//   const [isDialogOpen, setIsDialogOpen] = useState(false);
//   const [isFormOpen, setIsFormOpen] = useState(false); // State to toggle between dialog content and form
//   const { toast } = useToast();

//   const handleAddToCart = () => {
//     toast({
//       title: 'Added to cart',
//       description: `${product.name} has been added to your cart.`,
//     });
//     setIsDialogOpen(false);
//   };

//   const handleSendRequest = (e: React.FormEvent) => {
//     e.preventDefault(); // Prevent page reload
//     toast({
//       title: 'Request Sent',
//       description: `Your bargain request for ${product.name} has been sent.`,
//     });
//     setIsFormOpen(false);
//     setIsDialogOpen(false);
//   };

//   return (
//     <Card className="overflow-hidden">
//       <CardHeader className="p-0">
//         <div className="aspect-square relative bg-gray-100">
//           <Image
//             src={product.url}
//             alt={product.name}
//             fill
//             className="object-cover"
//           />
//         </div>
//       </CardHeader>
//       <CardContent className="p-4">
//         <CardTitle className="line-clamp-1">{product.name}</CardTitle>
//         <div className="mt-2 flex items-center justify-between">
//           <span className="text-2xl font-bold">₹{product.price.toFixed(2)}</span>
//           <Badge variant={product.quantity > 0 ? 'secondary' : 'destructive'}>
//             {product.quantity > 0 ? 'In Stock' : 'Out of Stock'}
//           </Badge>
//         </div>
//       </CardContent>
//       <CardFooter className="p-4 pt-0">
//         <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
//           <DialogTrigger asChild>
//             <Button className="w-full" disabled={product.quantity === 0}>
//               View Details
//             </Button>
//           </DialogTrigger>
//           <DialogContent>
//             {!isFormOpen ? (
//               <>
//                 <DialogHeader>
//                   <DialogTitle>{product.name}</DialogTitle>
//                   <DialogDescription>
//                     SKU: {product.sku}
//                   </DialogDescription>
//                 </DialogHeader>
//                 <div className="grid gap-4">
//                   <div className="aspect-square relative rounded-lg overflow-hidden">
//                     <Image
//                       src={product.url}
//                       alt={product.name}
//                       fill
//                       className="object-cover"
//                     />
//                   </div>
//                   <div className="space-y-2">
//                     <p className="text-2xl font-bold">₹{product.price.toFixed(2)}</p>
//                     <p className="text-gray-500">
//                       {product.quantity > 0
//                         ? `${product.quantity} units available`
//                         : 'Currently out of stock'}
//                     </p>
//                   </div>
//                   <Button
//                     className="bg-blue-400 text-black hover:bg-blue-500"
//                     onClick={() => setIsFormOpen(true)} // Open the form
//                   >
//                     Send Bargain Request
//                   </Button>
//                   <Button
//                     onClick={handleAddToCart}
//                     disabled={product.quantity === 0}
//                   >
//                     Add to Cart
//                   </Button>
//                 </div>
//               </>
//             ) : (
//               <div className="space-y-4">
//                 <DialogHeader>
//                   <DialogTitle>Bargain Request</DialogTitle>
//                   <DialogDescription>
//                     Bargain for {product.name} at ₹{product.price.toFixed(2)}
//                   </DialogDescription>
//                 </DialogHeader>
//                 <form className="space-y-4" onSubmit={handleSendRequest}>
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700">Name</label>
//                     <input
//                       type="text"
//                       className="w-full border border-gray-300 rounded px-3 py-2"
//                       placeholder="Enter your name"
//                     />
//                   </div>
//                   <div>
//                     <label className="block text-md font-medium text-gray-700">Contact Details</label>
//                     <input
//                       type="text"
//                       className="w-full border border-gray-300 rounded px-3 py-2"
//                       placeholder="Enter your email or phone"
//                     />
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700">Requested Quantity (Bulk)</label>
//                     <input
//                       type="number"
//                       className="w-full border border-gray-300 rounded px-3 py-2"
//                       placeholder="Enter the quantity"
//                     />
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700">Requested Price (Per Product)</label>
//                     <input
//                       type="number"
//                       className="w-full border border-gray-300 rounded px-3 py-2"
//                       placeholder="Enter the price per product"
//                     />
//                   </div>
//                   <div className="flex justify-end space-x-4">
//                     <Button
//                       type="button"
//                       onClick={() => setIsFormOpen(false)} // Close form and return to dialog content
//                       className="bg-gray-300 text-black hover:bg-gray-400"
//                     >
//                       Back
//                     </Button>
//                     <Button
//                       type="submit"
//                       className="bg-green-500 text-white hover:bg-green-600"
//                     >
//                       Send Request
//                     </Button>
//                   </div>
//                 </form>
//               </div>
//             )}
//           </DialogContent>
//         </Dialog>
//       </CardFooter>
//     </Card>
//   );
// }




'use client';

import Image from 'next/image';
import { useState } from 'react';
import { Inventory } from '@/lib/amazon-mcf';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { useToast } from '@/components/ui/use-toast';

interface ProductCardProps {
  product: Inventory;
}

export function ProductCard({ product }: ProductCardProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isAddToCartDialogOpen, setIsAddToCartDialogOpen] = useState(false); // Manage Add to Cart dialog state
  const { toast } = useToast();

  const handleAddToCart = () => {
    setIsAddToCartDialogOpen(true);
  };

  const handleConfirmAddToCart = () => {
    toast({
      title: 'Added to cart',
      description: `${product.name} has been added to your cart.`,
    });
    setIsAddToCartDialogOpen(false);
    setIsDialogOpen(false);
  };

  const handleSendRequest = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: 'Request Sent',
      description: `Your bargain request for ${product.name} has been sent.`,
    });
    setIsFormOpen(false);
    setIsDialogOpen(false);
  };

  return (
    <Card className="overflow-hidden">
      <CardHeader className="p-0">
        <div className="aspect-square relative bg-gray-100">
          <Image
            src={product.url}
            alt={product.name}
            fill
            className="object-cover"
          />
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <CardTitle className="line-clamp-1">{product.name}</CardTitle>
        <div className="mt-2 flex items-center justify-between">
          <span className="text-2xl font-bold">₹{product.price.toFixed(2)}</span>
          <Badge variant={product.quantity > 0 ? 'secondary' : 'destructive'}>
            {product.quantity > 0 ? 'In Stock' : 'Out of Stock'}
          </Badge>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="w-full" disabled={product.quantity === 0}>
              View Details
            </Button>
          </DialogTrigger>
          <DialogContent>
            {!isFormOpen ? (
              <>
                <DialogHeader>
                  <DialogTitle>{product.name}</DialogTitle>
                  <DialogDescription>SKU: {product.sku}</DialogDescription>
                </DialogHeader>
                <div className="grid gap-4">
                  <div className="aspect-square relative rounded-lg overflow-hidden">
                    <Image
                      src={product.url}
                      alt={product.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="space-y-2">
                    <p className="text-2xl font-bold">₹{product.price.toFixed(2)}</p>
                    <p className="text-gray-500">
                      {product.quantity > 0
                        ? `${product.quantity} units available`
                        : 'Currently out of stock'}
                    </p>
                  </div>
                  <Button
                    className="bg-blue-400 text-black hover:bg-blue-500"
                    onClick={() => setIsFormOpen(true)}
                  >
                    Send Bargain Request
                  </Button>
                  <Button
                    onClick={handleAddToCart}
                    disabled={product.quantity === 0}
                  >
                    Add to Cart
                  </Button>
                </div>
              </>
            ) : (
              <div className="space-y-4">
                <DialogHeader>
                  <DialogTitle>Bargain Request</DialogTitle>
                  <DialogDescription>
                    Bargain for {product.name} at ₹{product.price.toFixed(2)}
                  </DialogDescription>
                </DialogHeader>
                <form className="space-y-4" onSubmit={handleSendRequest}>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Name
                    </label>
                    <input
                      type="text"
                      className="w-full border border-gray-300 rounded px-3 py-2"
                      placeholder="Enter your name"
                    />
                  </div>
                  <div>
                    <label className="block text-md font-medium text-gray-700">
                      Contact Details
                    </label>
                    <input
                      type="text"
                      className="w-full border border-gray-300 rounded px-3 py-2"
                      placeholder="Enter your email or phone"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Requested Quantity (Bulk)
                    </label>
                    <input
                      type="number"
                      className="w-full border border-gray-300 rounded px-3 py-2"
                      placeholder="Enter the quantity"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Requested Price (Per Product)
                    </label>
                    <input
                      type="number"
                      className="w-full border border-gray-300 rounded px-3 py-2"
                      placeholder="Enter the price per product"
                    />
                  </div>
                  <div className="flex justify-end space-x-4">
                    <Button
                      type="button"
                      onClick={() => setIsFormOpen(false)}
                      className="bg-gray-300 text-black hover:bg-gray-400"
                    >
                      Back
                    </Button>
                    <Button
                      type="submit"
                      className="bg-green-500 text-white hover:bg-green-600"
                    >
                      Send Request
                    </Button>
                  </div>
                </form>
              </div>
            )}
          </DialogContent>
        </Dialog>

        {/* Add to Cart Confirmation Dialog */}
        <Dialog open={isAddToCartDialogOpen} onOpenChange={setIsAddToCartDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Added to Cart</DialogTitle>
              <DialogDescription>
                {product.name} has been successfully added to your cart.
              </DialogDescription>
            </DialogHeader>
            <Button
              onClick={handleConfirmAddToCart}
              className="bg-green-300 text-black hover:bg-green-400 w-full"
            >
              Confirm
            </Button>
          </DialogContent>
        </Dialog>
      </CardFooter>
    </Card>
  );
}
