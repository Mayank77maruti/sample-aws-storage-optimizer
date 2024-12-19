'use client'

import { useState } from 'react';
import { useRouter } from 'next/navigation'; // Use `next/navigation` in the app directory

const ShopifyAuth = () => {
  const [shopName, setShopName] = useState('');
  const router = useRouter();

  // const handleSubmit = (e: React.FormEvent) => {
  //   e.preventDefault();
  //   if (!shopName) {
  //     alert('Please enter a Shopify shop name.');
  //     return;
  //   }
    
  //   // Redirect the user to the API route with the shop query parameter
  //   router.push(`/api/auth?shop=${encodeURIComponent(shopName)}`);
  // };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!shopName) {
      alert('Please enter a Shopify shop name.');
      return;
    }

    try {
      // Send a POST request to the API route with the shop name
      // const response = await fetch('/api/shopify/shopName', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify({ name: shopName }), // Pass the shop name in the request body
      // });
      // console.log(response);
      // if (!response.ok) {
      //   throw new Error('Failed to authenticate with Shopify');
      // }

      // const data = await response.json();
      // console.log('Response:', data);

      // Optionally redirect after successful request (if needed)
      router.push(`/api/auth?shop=${encodeURIComponent(shopName)}`); // Replace with the desired redirect URL
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred while submitting the shop name.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white shadow-md rounded-lg p-8">
        <h1 className="text-2xl font-semibold text-gray-700 text-center mb-6">
          Shopify Authentication
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="shopName"
              className="block text-sm font-medium text-gray-700"
            >
              Shopify Shop Name
            </label>
            <input
              type="text"
              id="shopName"
              value={shopName}
              onChange={(e) => setShopName(e.target.value)}
              placeholder="e.g., myshop.myshopify.com"
              required
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Authenticate
          </button>
        </form>
      </div>
    </div>
  );
};

export default ShopifyAuth;
