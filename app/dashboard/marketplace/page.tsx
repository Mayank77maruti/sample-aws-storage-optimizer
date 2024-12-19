//

'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useInventory } from '@/hooks/use-inventory';
import { Input } from '@/components/ui/input';
import { ProductCard } from '@/components/product-card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { ShoppingCart } from 'lucide-react';

export default function MarketplacePage() {
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState('name-asc');
  const { inventory, isLoading } = useInventory();
  const router = useRouter();

  const handleCartClick = () => {
    router.push('/dashboard/marketplace/marketplacecart'); // Navigate to the marketplace cart page
  };

  const handleSellClick = () => {
    router.push('/dashboard/manufacturers');
  }

  if (isLoading) {
    return <div className="p-8">Loading products...</div>;
  }

  const filteredProducts = inventory?.filter((product) =>
    product.name.toLowerCase().includes(search.toLowerCase())
  );

  const sortedProducts = [...(filteredProducts || [])].sort((a, b) => {
    switch (sort) {
      case 'price-asc':
        return a.price - b.price;
      case 'price-desc':
        return b.price - a.price;
      case 'name-desc':
        return b.name.localeCompare(a.name);
      default:
        return a.name.localeCompare(b.name);
    }
  });

  return (
    <div>
      {/* Top Navigation */}
      <nav className="text-gray-700 py-4 px-8 flex justify-between items-center">
        <h1 className="text-xl font-bold hover:text-gray-400 transition duration-300">Marketplace</h1>

        <Input
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="max-w-sm"
        />

        <div className="flex gap-4 text-gray-700">
          <button className="hover:bg-gray-100 px-4 py-2 rounded-md transition duration-300">
            Orders
          </button>
          <button className="hover:bg-green-500 bg-green-300 px-4 py-2 rounded-md transition duration-300"
           onClick={handleSellClick} >
            Sell on Marketplace
          </button>
          <button
            className="hover:bg-gray-100 px-4 py-2 ml-8 rounded-md transition duration-300"
            onClick={handleCartClick}
          >
            <ShoppingCart className="h-8 w-8 text-blue-500 hover:translate-y-1" />
          </button>
        </div>
      </nav>

      {/* Banner Section */}
      <div className="bg-gray-800 mt-6 h-[35vh] rounded-sm ml-7 mr-7 flex items-center justify-between px-10 shadow-lg">
        {/* Tagline */}
        <div className="text-white font-bold text-3xl max-w-md transition duration-300 hover:text-gray-400">
          <p>
            <span className="text-blue-500 hover:text-blue-300 transition duration-300">"Vyapaar"</span> - Where Business Meets Possibility!
          </p>
          <p className="mt-4 text-lg hover:opacity-80 transition duration-300">
            Discover, trade, and grow with our trusted marketplace.
          </p>
        </div>

        {/* Image */}
        <div className="h-full flex items-center">
          <img
            src="/marketplace.png"
            alt="Vyapaar Marketplace"
            className="h-[90%] w-auto object-contain rounded-sm pl-5 transition-transform duration-300 hover:scale-105 hover:opacity-90"
          />
        </div>
      </div>

      {/* Sorting and Product Grid */}
      <div className="p-8">
        <Select value={sort} onValueChange={setSort}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="name-asc">Name (A-Z)</SelectItem>
            <SelectItem value="name-desc">Name (Z-A)</SelectItem>
            <SelectItem value="price-asc">Price (Low to High)</SelectItem>
            <SelectItem value="price-desc">Price (High to Low)</SelectItem>
          </SelectContent>
        </Select>

        {/* Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 bg-slate-200 px-8 py-5 rounded-md mt-3">
          {sortedProducts?.map((product) => (
            <div
              key={product.id}
              className="transform transition-transform duration-300 hover:scale-105 hover:shadow-lg rounded-lg"
            >
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

