'use client';
import { useState } from 'react';
import { Button } from '@/components/ui/button'; 

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

// Product form interface for manufacturer listing
interface ProductForm {
  name: string;
  description: string;
  price: number;
  image: File | null; // State for storing the uploaded image
}

export default function ManufacturerPage() {
  // State for managing the tab selection
 
  // State for the product form
  const [productForm, setProductForm] = useState<ProductForm>({
    name: '',
    description: '',
    price: 0,
    image: null, // Initialize with no image
  });

  // Handle input changes for product form
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, files } = e.target;
    if (name === 'image' && files) {
      setProductForm((prev) => ({ ...prev, image: files[0] }));
    } else {
      setProductForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  // Handle form submission
  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (productForm.image) {
      const formData = new FormData();
      formData.append('name', productForm.name);
      formData.append('description', productForm.description);
      formData.append('price', productForm.price.toString());
      formData.append('image', productForm.image); // Append the image file

      try {
        // You can use this FormData to send a POST request to your backend API endpoint
        const response = await fetch('/api/products', {
          method: 'POST',
          body: formData,
        });

        if (response.ok) {
          alert('Product listed successfully!');
          setProductForm({ name: '', description: '', price: 0, image: null }); // Reset the form
        } else {
          alert('Failed to list product.');
        }
      } catch (error) {
        console.error('Error listing product:', error);
        alert('An error occurred. Please try again later.');
      }
    } else {
      alert('Please attach an image for your product.');
    }
  };

  return (
    <div className="relative">
      

      {/* Main Content */}
      <div className="md:ml-17 ml-3 mt-5">
       

        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-6">Marketplace Sales Dashboard</h2>

         
       

        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          <Card className="p-6">
            <div className="flex items-center gap-4">
              <ShoppingCart className="h-8 w-8 text-blue-500" />
              <div>
                <p className="text-sm text-muted-foreground">Total Orders</p>
                <h3 className="text-xl sm:text-2xl font-bold">5</h3>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center gap-4">
              <Package className="h-8 w-8 text-green-500" />
              <div>
                <p className="text-sm text-muted-foreground">Fulfilled Orders</p>
                <h3 className="text-xl sm:text-2xl font-bold">3</h3>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center gap-4">
              <AlertCircle className="h-8 w-8 text-yellow-500" />
              <div>
                <p className="text-sm text-muted-foreground">Pending Orders</p>
                <h3 className="text-xl sm:text-2xl font-bold">2</h3>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center gap-4">
              <TrendingUp className="h-8 w-8 text-purple-500" />
              <div>
                <p className="text-sm text-muted-foreground">Revenue</p>
                <h3 className="text-xl sm:text-2xl font-bold">₹3600</h3>
              </div>
            </div>
          </Card>
        </div>
      </div>

     
      {/* Product Listing Form */}
      <div className="mt-12 p-8 border rounded-lg shadow-md bg-white mx-10">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">List New Product</h2>
        <form onSubmit={handleFormSubmit}>
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Product Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={productForm.name}
              onChange={handleInputChange}
              className="mt-2 w-full px-4 py-2 border rounded-md"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
            <textarea
              id="description"
              name="description"
              value={productForm.description}
              onChange={handleInputChange}
              className="mt-2 w-full px-4 py-2 border rounded-md"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="price" className="block text-sm font-medium text-gray-700">Price (₹)</label>
            <input
              type="number"
              id="price"
              name="price"
              value={productForm.price}
              onChange={handleInputChange}
              className="mt-2 w-full px-4 py-2 border rounded-md"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="image" className="block text-sm font-medium text-gray-700">Product Image</label>
            <input
              type="file"
              id="image"
              name="image"
              onChange={handleInputChange}
              className="mt-2 w-full px-4 py-2 border rounded-md"
            />
          </div>

          <Button type="submit" className="bg-blue-600 text-white py-2 px-6 rounded-md hover:bg-blue-700 transition">
            List Product
          </Button>
        </form>
      </div>
    </div>
  );
}
