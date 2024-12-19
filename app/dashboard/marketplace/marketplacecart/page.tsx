'use client';
import { useState } from 'react';
import { Button } from '@/components/ui/button'; // Assuming you have a Button component in your project

// Define product type
interface Product {
  id: string;
  name: string;
  description: string;
  price: number;  // Price in INR
  quantity: number;
}

// Inline JSON data for cart products (bulk products for dropshipping)
const productData: Product[] = [
  {
    id: "1",
    name: "Bulk T-Shirts (Pack of 50)",
    description: "High-quality cotton T-shirts, available in various sizes. Ideal for bulk selling.",
    price: 1500,  // Price per pack
    quantity: 2   // Number of packs
  },
  {
    id: "2",
    name: "Bulk Mugs (Set of 100)",
    description: "Durable ceramic mugs. Perfect for corporate gifts and bulk orders.",
    price: 2500,  // Price per set
    quantity: 3   // Number of sets
  },
  {
    id: "3",
    name: "Bulk Sneakers (Pack of 30)",
    description: "Comfortable and stylish sneakers, ideal for bulk distribution.",
    price: 4500,  // Price per pack
    quantity: 1   // Number of packs
  }
];

export default function CartPage() {
  // State to manage cart products
  const [cart, setCart] = useState<Product[]>(productData);

  // Calculate total price
  const calculateTotal = () => {
    return cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  };

  // Handle placing the order
  const placeOrder = () => {
    alert('Your order has been placed!');
    setCart([]); // Clear the cart after order is placed
  };

  // Remove product from cart
  const removeFromCart = (productId: string) => {
    setCart(cart.filter((item) => item.id !== productId));
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Your Shopping Cart</h1>

      {cart.length === 0 ? (
        <div className="text-center text-gray-600">Your cart is empty.</div>
      ) : (
        <div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {cart.map((product) => (
              <div key={product.id} className="border rounded-lg p-4 shadow-md bg-white relative">
                {/* Cross button to remove product */}
                <button
                  onClick={() => removeFromCart(product.id)}
                  className="absolute top-2 right-2 text-gray-600 hover:text-red-600"
                >
                  ✖
                </button>
                <div>
                  <h2 className="text-lg font-semibold text-gray-800">{product.name}</h2>
                  <p className="text-sm text-gray-500">{product.description}</p>
                  <p className="mt-2 text-xl font-semibold text-gray-900">₹{product.price}</p>
                  <div className="mt-4">
                    <p className="text-md text-gray-700">Quantity: {product.quantity} packs</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Cart Summary */}
          <div className="mt-8 flex justify-between items-center">
            <div className="text-lg font-semibold text-gray-800">Total: ₹{calculateTotal().toLocaleString()}</div>
            <Button onClick={placeOrder} className="bg-blue-600 text-white py-2 px-6 rounded-md shadow-md hover:bg-blue-700 transition">
              Place Order
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
