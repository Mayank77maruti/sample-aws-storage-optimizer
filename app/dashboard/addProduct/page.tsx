'use client';
import React, { useState } from 'react';
import axios from 'axios';
import { Cross, Upload } from 'lucide-react';
import Image from 'next/image';
import uploadProductImages from '@/app/utils/uploader';
import { useCopilotAction, useCopilotReadable } from "@copilotkit/react-core";
import ReactMarkdown from 'react-markdown';

import {
  
  Sparkle,

  
} from "lucide-react";

type Option = {
  name: string;
  values: string;
};

type Variant = {
  title: string;
  price: number;
  sku: string;
  inventoryQty: number;
};

type Image = {
  url: string;
};

const ProductForm = () => {
  const [productImages, setProductImages] = useState<File[]>([]);

  const [recipe, setRecipe] = useState<string>('');
    const [suggestions, setSuggestions] = useState<string>('');

    useCopilotReadable({ description: "Current recipe", value: recipe });

    const handleRecipeModifier = async () => {
        const response = await fetch("/api/getSuggestions", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ recipe}),
        });
        const data = await response.json();
        setSuggestions(data.outputText);
        setProduct((prevProduct) => ({
          ...prevProduct,
          bodyHtml: data.outputText, // Update the title
        }));
    };
    // Define the action to get suggestions dynamically
    useCopilotAction({
        name: "Product description Suggestions",
        description: "Fetch suggestions for product description",
        parameters: [
            { name: "recipe", description: "The input description text", type: "string" },
        ],
        handler: async ({ recipe }) => {
            // Simulate fetching suggestions from an API or AI model
            const response = await fetch("/api/getSuggestions", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ recipe }),
            });
            const data = await response.json();
            setSuggestions(data.outputText);
            setProduct((prevProduct) => ({
              ...prevProduct,
              bodyHtml: data.outputText, // Update the title
            }));
        },
    });

    const handleRecipeInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setRecipe(e.target.value);
    };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
        setProductImages(Array.from(e.target.files));
    }
  };

  const removeImage = (image: File) => {
      const prodImages = productImages;

      const newProdImages = prodImages.filter((img)=>img!==image);

      setProductImages(newProdImages);
  }

  const [product, setProduct] = useState({
    title: '',
    bodyHtml: '',
    vendor: '',
    productType: '',
    tags: '',
    options: [{ name: '', values: '' }] as Option[],
    variants: [{ title: '', price: 0, sku: '', inventoryQty: 0 }] as Variant[],
    // images: [{ url: '' }] as Image[],
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, field: keyof typeof product) => {
    const { value } = e.target;
    setProduct((prevState) => ({ ...prevState, [field]: value }));
  };

  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>, field: keyof typeof product) => {
    setRecipe(e.target.value);
    const { value } = e.target;
    
    setProduct((prevState) => ({ ...prevState, [field]: value }));
  };

  const handleOptionsChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number,
    field: keyof Option
  ) => {
    const newOptions = [...product.options];
    newOptions[index][field] = e.target.value;
    setProduct((prevState) => ({ ...prevState, options: newOptions }));
  };

  const handleVariantsChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number,
    field: keyof Variant
  ) => {
    const newVariants = [...product.variants];

    if (field === 'price' || field === 'inventoryQty') {
      newVariants[index][field] = parseFloat(e.target.value) || 0;
    } else {
      newVariants[index][field] = e.target.value;
    }

    setProduct((prevState) => ({ ...prevState, variants: newVariants }));
  };


  const addOption = () => {
    setProduct((prevState) => ({
      ...prevState,
      options: [...prevState.options, { name: '', values: '' }],
    }));
  };

  const addVariant = () => {
    setProduct((prevState) => ({
      ...prevState,
      variants: [...prevState.variants, { title: '', price: 0, sku: '', inventoryQty: 0 }],
    }));
  };


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();

    productImages.forEach(imageFile => {
      formData.append("files", imageFile);
    });

    console.log("prodImages: ", productImages);

    const uploadResult = await uploadProductImages(formData);

    const uploadRes = JSON.parse(uploadResult);

    console.log("uploadres: ", uploadRes.imageURLs);

    const images: {url: string}[] = [];

    if(uploadRes.success){
      for(const imageURL of uploadRes.imageURLs){
        images.push({ url: imageURL });
      }

      console.log("imageUrls: ", images);

      // setProduct({ ...product, images: images });
    }else {
      console.log("can not upload image: ", uploadRes.error);
      return;
    }

    const res = await axios.get('/api/sellerId');
    const { sellerId }: { sellerId: string } = res.data;
    console.log("product data: ", product);
    try {
      const response = await axios.post('/api/productCreation', { ...product, images, sellerId });
      console.log('Product created successfully:', response.data);
    } catch (error) {
      console.error('Error creating product:', error);
    }
  };

  return (
    
    <form onSubmit={handleSubmit} className="space-y-6 bg-neutral-50 p-6 rounded-lg ml-10 mr-10 shadow-lg mx-auto">
      <h2 className="text-2xl font-semibold">Add New product</h2>
      <div className='flex flex-row space-x-10'>
      <div className='bg-neutral-100 px-8 rounded-md w-[90vh]'>
        <label className='block font-semibold text-lg py-6'>General Information</label>
        <label className="block font-semibold">Product Name</label>
        <input 
          type="text"
          value={product.title}
          onChange={(e) => handleInputChange(e, 'title')}
          className="w-full p-3 mt-1 border border-gray-300 bg-neutral-200 rounded-md focus:outline-none focus:ring-2 focus:ring-zinc-700"
          required
        />
    

      <div className='mt-5'>
        <label className="block font-semibold ">Product Description</label>
        <textarea
          value={product.bodyHtml}
          onChange={(e) => handleTextareaChange(e, 'bodyHtml')}
          className="w-full p-3 mt-1 border border-gray-300 bg-neutral-200  rounded-md focus:outline-none focus:ring-2 focus:ring-zinc-700"
          required
        />
        {/* <button onClick={handleRecipeModifier} className=''>Ai suggestions</button> */}
        <button
          type="button"
          onClick={handleRecipeModifier}
          className="px-6 bg-purple-300 text-white rounded-md py-3 my-3 hover:bg-purple-400 transition duration-200"
          >
            <div className='flex flex-row  text-black'>
            <p className='pt-1'>AI Suggestions</p>
              <Sparkle className="h-8 w-8 px-2" />
              
          
            </div>
         
           
          </button>
          <p className='text-gray-500 pb-5'>(Click to write Discription with Gen AI)</p>
          <div>
        <label className="block font-semibold">Vendor Name</label>
        <input
          type="text"
          value={product.vendor}
          onChange={(e) => handleInputChange(e, 'vendor')}
          className="w-full p-3 mt-1 border border-gray-300 bg-neutral-200  rounded-md focus:outline-none focus:ring-2 focus:ring-zinc-700 mb-5"
          required
        />
      </div>
        </div>
        </div>

        <div>
          <div className='bg-neutral-100 px-8 rounded-md h-full w-full'>

          <label className="block font-semibold text-lg py-6">Product Image</label>

          <div className='flex justify-start items-center w-full'>
          {
              productImages.map((image, i)=>{
                  return <div key={i} className='rounded-lg m-4 flex-col flex justify-center items-center'>
                              <Cross fill='black' className='text-gray-700 bg-white rounded-full p-1 size-6 rotate-[45deg] cursor-pointer relative top-4 -right-5' onClick={()=>removeImage(image)}/>
                              <Image src={URL.createObjectURL(image)} alt={`product-img-${i}`} width={50} height={50} />
                          </div>
              })
          }
            </div>
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
      <div>
        <label className='block font-semibold py-3'>Product Type</label>
        <input
          type="text"
          value={product.productType}
          onChange={(e) => handleInputChange(e, 'productType')}
          className="w-full p-3 mt-1 border border-gray-300 bg-neutral-200  rounded-md focus:outline-none focus:ring-2 focus:ring-zinc-700 mb-5"
          required
        />
            </div>
            <div>
        <label className='block font-semibold py-3'>Tags</label>
        <input
          type="text"
          value={product.tags}
          onChange={(e) => handleInputChange(e, 'tags')}
          className="w-full p-3 mt-1 border border-gray-300 bg-neutral-200  rounded-md focus:outline-none focus:ring-2 focus:ring-zinc-700 mb-5"
        />
      </div>

          </div>
        </div>

        </div>
   
          <div  className='bg-neutral-100 px-8 rounded-md w-full'>
     
    

      {/* <div>
        <label className="block text-gray-600">Seller ID</label>
        <input
          type="text"
          value={product.sellerId}
          onChange={(e) => handleInputChange(e, 'sellerId')}
          className="w-full p-3 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div> */}

      {/* Options Section */}

      <div>
        <label className="block font-semibold pt-5 pb-3">Options</label>
        {product.options.map((option, index) => (
          <div key={index} className="flex space-x-4 mb-4">
            <input
              type="text"
              value={option.name}
              onChange={(e) => handleOptionsChange(e, index, 'name')}
              placeholder="Option name"
              className="w-1/2 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <input
              type="text"
              value={option.values}
              onChange={(e) => handleOptionsChange(e, index, 'values')}
              placeholder="Option values (comma separated)"
              className="w-1/2 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
        ))}
        <button
          type="button"
          onClick={addOption}
           className="px-6 bg-purple-300 rounded-md py-3 my-3 hover:bg-purple-400 transition duration-200"
        >
          Add Option
        </button>
      </div>

      {/* Variants Section */}
      <div>
        <label className="block font-semibold pt-5 pb-3">Variants</label>
        {product.variants.map((variant, index) => (
          <div key={index} className="flex space-x-4 mb-4">
            <input
              type="text"
              value={variant.title}
              onChange={(e) => handleVariantsChange(e, index, 'title')}
              placeholder="Variant title"
              className="w-1/4 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <input
              type="number"
              value={variant.price}
              onChange={(e) => handleVariantsChange(e, index, 'price')}
              style={{
                WebkitAppearance: 'none', 
                MozAppearance: 'textfield', 
              }}
              placeholder="Price"
              className="w-1/4 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <input
              type="text"
              value={variant.sku}
              onChange={(e) => handleVariantsChange(e, index, 'sku')}
              placeholder="SKU"
              className="w-1/4 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="number"
              value={variant.inventoryQty}
              onChange={(e) => handleVariantsChange(e, index, 'inventoryQty')}
              style={{
                WebkitAppearance: 'none', 
                MozAppearance: 'textfield', 
              }}
              placeholder="Inventory Qty"
              className="w-1/4 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
        ))}
        <button
          type="button"
          onClick={addVariant}
          className="px-6 bg-purple-300 rounded-md py-3 my-3 hover:bg-purple-400 transition duration-200"

        >
          Add Variant
        </button>
      </div>

      {/* Images Section */}
      {/* <div>
        <label className="block text-gray-600">Images</label>
        {product.images.map((image, index) => (
          <div key={index} className="flex space-x-4 mb-4">
            <input
              type="text"
              value={image.url}
              onChange={(e) => handleImagesChange(e, index)}
              placeholder="Image URL"
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        ))}
        <button
          type="button"
          onClick={addImage}
          className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-200"
        >
          Add Image
        </button>
      </div> */}

  
</div>
    
      <button
        type="submit"
        className="w-full px-6 py-3 bg-green-600 text-white rounded-md hover:bg-green-700 transition duration-200"
      >
        Submit
      </button>
      </form>
     
  );
};

export default ProductForm;
