"use client";

import React, { useState } from "react";
import { Cross, Upload } from "lucide-react";
import Image from "next/image";

export interface BuyerProductData {
  name: string;
  price: number;
  description: string;
  isFeatured: boolean;
  isArchived: boolean;
  color: string;
  quantity: number;
  size: string;
  categorId: string;
  storeId: string
  pricetocompare: number;
  images: string[];
}

function ManufacturerProducts() {
  const [productImages, setProductImages] = useState<File[]>([]);

  const [productData, setProductData] = useState<BuyerProductData>({
    name: "",
    price: 0,
    description: "",
    isFeatured: false,
    isArchived: false,
    color: "",
    quantity: 0,
    size: "",
    categorId: '',
    storeId: '',
    pricetocompare: 0,
    images: [],
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setProductImages(Array.from(e.target.files));
    }
  };

  const removeImage = (image: File) => {
    const prodImages = productImages;

    const newProdImages = prodImages.filter((img) => img !== image);

    setProductImages(newProdImages);
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setProductData({ ...productData, [e.target.name]: e.target.value });
  }

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Add Manufacturer Product</h1>
        <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700">
          Save Product
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <form className="space-y-6">
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Product Name
              </label>
              <input
                type="text"
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                placeholder="Enter product name"
                name="name"
                value={productData.name}
                onChange={onChange}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Price
              </label>
              <input
                type="number"
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                placeholder="Enter price"
                name="price"
                value={productData.price}
                onChange={onChange}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description
            </label>
            <textarea
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
              rows={4}
              placeholder="Enter product description"
              name="description"
              value={productData.description}
              onChange={onChange}
            />
          </div>


          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Quantity
              </label>
              <input
                type="number"
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                placeholder="Enter Quantity"
                name="quantity"
                value={productData.quantity}
                onChange={onChange}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Color
              </label>
              <input
                type="text"
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                placeholder="Enter color"
                name='color'
                value={productData.color}
                onChange={onChange}
              />
            </div>
          </div> 

          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Category
              </label>
              <select className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" name="categorId" value={productData.categorId} onChange={onChange}>
                <option>Select category</option>
                <option>Electronics</option>
                <option>Clothing</option>
                <option>Furniture</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Store
              </label>
              <select className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" name="storeId" value={productData.storeId} onChange={onChange}>
                <option>Select store</option>
                <option>Store 1</option>
                <option>Store 2</option>
              </select>
            </div>
          </div>

          <div className="flex justify-start items-center w-full">
            {productImages.map((image, i) => {
              return (
                <div
                  key={i}
                  className="rounded-lg m-4 flex-col flex justify-center items-center"
                >
                  <Cross
                    fill="black"
                    className="text-gray-700 bg-white rounded-full p-2 size-8 rotate-[45deg] cursor-pointer relative top-4 -right-5"
                    onClick={() => removeImage(image)}
                  />
                  <Image
                    src={URL.createObjectURL(image)}
                    alt={`product-img-${i}`}
                    width={50}
                    height={50}
                  />
                </div>
              );
            })}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Images
            </label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
              <input
                type="file"
                multiple
                accept="image/*"
                className="hidden"
                id="image-upload"
                onChange={handleImageChange}
              />
              <label
                htmlFor="image-upload"
                className="cursor-pointer flex flex-col items-center"
              >
                <Upload className="h-12 w-12 text-gray-400" />
                <span className="mt-2 text-sm text-gray-600">
                  Drop images here or click to upload
                </span>
              </label>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Size
            </label>
            <div className="flex gap-2">
              <select 
                className='w-32 p-2 border border-gray-300 rounded-md'
                name="size"
                value={productData.size}
                onChange={onChange}
            >
                <option value="">Select Size</option>
                <option value="S">S</option>
                <option value="XS">XS</option>
                <option value="M">M</option>
                <option value="L">L</option>
                <option value="XL">XL</option>
                <option value="XXL">XXL</option>
                <option value="XXXL">XXXL</option>
              </select>
            </div>
          </div>

          <div className="flex gap-4">
            <label className="flex items-center">
              <input type="checkbox" className="mr-2" name='isFeatured' checked={productData.isFeatured} onChange={(e)=>setProductData({ ...productData, isFeatured: e.target.checked })} />
              Featured Product
            </label>
            <label className="flex items-center">
              <input type="checkbox" className="mr-2" name='isArchived' checked={productData.isFeatured} onChange={(e)=>setProductData({ ...productData, isArchived: e.target.checked })} />
              Archive Product
            </label>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ManufacturerProducts;
