'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import { Button } from '@/components/ui/button';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';

interface Option {
    name: string;
    values: string[];
}

interface Variant {
    id?: number;
    title: string;
    price: number;
    sku?: string;
    inventoryQty: number;
}

interface Image {
    id?: number;
    url: string;
}

interface Product {
    id?: number;
    title: string;
    bodyHtml: string;
    vendor?: string;
    productType?: string;
    tags: string[];
    sellerId: string;
    options: Option[];
    variants: Variant[];
    images: Image[];
    shopifyId: string;
}

export default function InventoryPage() {
    const [search, setSearch] = useState<string>('');
    const [products, setProducts] = useState<Product[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
    const [responseData, setResponseData] = useState(null);
    const [demandData, setDemandData] = useState(null);

    // useEffect(() => {
    //     const fetchData = async () => {
    //         try {
    //             const response = await axios.post('http://localhost:3000/api/ai/demand', {
    //                 body: JSON.stringify({
    //                     item_id: 'ITEM9999',
    //                     city: 'ExampleCity',
    //                     date: '2024-07-15',
    //                     quantity: 50,
    //                     category: 'Electronics',
    //                 }),
    //             });
    //             setResponseData(response.data);
    //         } catch (error: any) {
    //             console.error("Error fetching data:", error);
    //             // setResponseData({ error: "Failed to fetch data" });
    //         }
    //     };

    //     fetchData();
    // }, []);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const res = await axios.get<Product[]>('/api/productCreation');
                console.log(res);
                setProducts(res.data);
                setIsLoading(false);
            } catch (error) {
                console.error('Error fetching products:', error);
                setIsLoading(false);
            }
        };

        fetchProducts();
    }, []);

    const pushShopify = async (product: Product) => {
        // console.log(product.options.map((option: any) => ({
        //     "name": option.name,
        //     "values": option.values,
        // })));
        try {
            const response = await axios.get('/api/sellerId');
            const { sellerId }: { sellerId: string } = response.data;
            const res = await axios.post('/api/shopify/pushProduct', { product, sellerId });
            console.log('Product pushed successfully:', res.data);
        } catch (error) {
            console.error('Error pushing product to Shopify:', error);
        }
    };

    const getPredictedPrice = async (selectedProduct: Product) => {
        // console.log('enter')
        if (!selectedProduct) {
            console.error("No product selected");
            return;
        }

        try {
            const test = selectedProduct.variants?.reduce(
                (total, variant) => total + variant.inventoryQty,
                0
            )
            console.log(test);
            const productData = {
                item_id: selectedProduct.id || "ITEM9999",
                city: "ExampleCity", // Default value
                date: new Date().toISOString().split("T")[0], // Current date in YYYY-MM-DD format
                quantity: selectedProduct.variants?.reduce(
                    (total, variant) => total + variant.inventoryQty,
                    0
                ) || 50, // Default value
                category: selectedProduct.productType || "Books", // Default value
            };

            const response = await fetch('/api/ai/demand', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(productData),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            console.log(data);
            setDemandData(data.prediction);
        } catch (error: any) {
            console.error("Error fetching data:", error);
            // setResponseData({ error: "Failed to fetch data" });
        }
    };
    const getPredictedDemand = async (selectedProduct: Product) => {
        // console.log('enter')
        if (!selectedProduct) {
            console.error("No product selected");
            return;
        }

        try {
            const test = selectedProduct.variants?.reduce(
                (total, variant) => total + variant.inventoryQty,
                0
            )
            console.log(test);
            const productData = {
                item_id: selectedProduct.id || "ITEM9999",
                city: "ExampleCity", // Default value
                date: new Date().toISOString().split("T")[0], // Current date in YYYY-MM-DD format
                quantity: selectedProduct.variants?.reduce(
                    (total, variant) => total + variant.inventoryQty,
                    0
                ) || 50, // Default value
                category: selectedProduct.productType || "Books", // Default value
                price: selectedProduct.variants[0].price
            };

            const response = await fetch('/api/ai/price', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(productData),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            console.log(data);
            setResponseData(data.prediction);
        } catch (error: any) {
            console.error("Error fetching data:", error);
            // setResponseData({ error: "Failed to fetch data" });
        }
    };


    const handleMoreDetails = (product: Product) => {
        setSelectedProduct(product);
    };

    const closeDialog = () => {
        setSelectedProduct(null);
    };

    const filteredProducts = products.filter((product) =>
        product.title.toLowerCase().includes(search.toLowerCase()) ||
        product.variants.some((variant) =>
            variant.sku?.toLowerCase().includes(search.toLowerCase())
        )
    );

    if (isLoading) {
        return <div className="p-8">Loading inventory...</div>;
    }

    return (
        <div className="p-8">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-3xl font-bold tracking-tight">Inventory</h2>
                <Button>Add Product</Button>
            </div>

            <div className="flex gap-4 mb-6">
                <Input
                    placeholder="Search products..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="max-w-sm"
                />
            </div>

            <div className="border rounded-lg">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Product ID</TableHead>
                            <TableHead>Title</TableHead>
                            <TableHead>SKU</TableHead>
                            <TableHead>Quantity</TableHead>
                            <TableHead>Price</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Shopify</TableHead>
                            <TableHead>Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {filteredProducts.map((product) => (
                            <TableRow key={product.id}>
                                <TableCell>{product.id}</TableCell>
                                <TableCell>{product.title}</TableCell>
                                <TableCell>
                                    {product.variants.map((variant) => variant.sku).join(', ')}
                                </TableCell>
                                <TableCell>
                                    {product.variants.reduce(
                                        (total, variant) => total + variant.inventoryQty,
                                        0
                                    )}
                                </TableCell>
                                <TableCell>
                                    ₹
                                    {product.variants
                                        .reduce(
                                            (total, variant) => total + variant.price * variant.inventoryQty,
                                            0
                                        )
                                        .toFixed(2)}
                                </TableCell>
                                <TableCell>
                                    <Badge
                                        variant={
                                            product.variants.some((variant) => variant.inventoryQty > 10)
                                                ? 'default' // Map 'success' to 'default'
                                                : product.variants.some((variant) => variant.inventoryQty > 0)
                                                    ? 'secondary' // Map 'warning' to 'secondary'
                                                    : 'destructive' // No change for 'destructive'
                                        }
                                    >
                                        {product.variants.some((variant) => variant.inventoryQty > 10)
                                            ? 'In Stock'
                                            : product.variants.some((variant) => variant.inventoryQty > 0)
                                                ? 'Low Stock'
                                                : 'Out of Stock'}
                                    </Badge>
                                </TableCell>
                                <TableCell>
                                    {product.shopifyId ? <Badge className='bg-green-700'>On Shopify</Badge> : <Button onClick={() => pushShopify(product)}>Push to shopify</Button>}
                                </TableCell>
                                <TableCell>
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => handleMoreDetails(product)}
                                    >
                                        More Details
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>

            {/* {selectedProduct && (
                <Dialog open={!!selectedProduct} onOpenChange={closeDialog}>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Product Details</DialogTitle>
                            <DialogDescription>
                                Detailed information about the selected product.
                            </DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4">
                            <p><strong>Product ID:</strong> {selectedProduct.id}</p>
                            <p><strong>Title:</strong> {selectedProduct.title}</p>
                            <p><strong>Options:</strong> {selectedProduct.options.map((o) => o.name).join(', ')}</p>
                            <p><strong>Variants:</strong></p>
                            <ul>
                                {selectedProduct.variants.map((variant) => (
                                    <li key={variant.id}>
                                        <strong>{variant.title}</strong> - ₹{variant.price.toFixed(2)} - {variant.inventoryQty} units
                                    </li>
                                ))}
                            </ul>
                            <p><strong>Images:</strong></p>
                            <div className="flex gap-2">
                                {selectedProduct.images.map((image) => (
                                    <img
                                        key={image.id}
                                        src={image.url}
                                        alt="Product Image"
                                        className="w-24 h-24 object-cover border"
                                    />
                                ))}
                            </div>
                        </div>
                        {responseData}
                        <Button onClick={() => getPredictedPrice(selectedProduct)} className="mt-4">
                            AI Price
                        </Button>

                        <Button onClick={closeDialog} className="mt-4">
                            Close
                        </Button>
                    </DialogContent>
                </Dialog>
            )} */}
            {selectedProduct && (
                <Dialog open={!!selectedProduct} onOpenChange={closeDialog}>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle className="text-lg font-bold">
                                Product Details
                            </DialogTitle>
                            <DialogDescription className="text-gray-500">
                                Explore the details of the selected product and get an AI-suggested price.
                            </DialogDescription>
                        </DialogHeader>

                        <div className="space-y-6">

                            <div className="border-b pb-4">
                                <p className="text-sm text-gray-600">
                                    <strong>Product ID:</strong> {selectedProduct.id}
                                </p>
                                <p className="text-lg font-medium text-gray-800">
                                    <strong>Title:</strong> {selectedProduct.title}
                                </p>
                            </div>


                            <div>
                                <p className="text-sm text-gray-600">
                                    <strong>Options:</strong>{" "}
                                    {selectedProduct.options.map((o) => o.name).join(", ")}
                                </p>
                            </div>


                            <div>
                                <p className="text-sm text-gray-600">
                                    <strong>Variants:</strong>
                                </p>
                                <ul className="pl-4 list-disc text-sm text-gray-700">
                                    {selectedProduct.variants.map((variant) => (
                                        <li key={variant.id}>
                                            <strong>{variant.title}</strong> - ₹{variant.price.toFixed(2)} -{" "}
                                            {variant.inventoryQty} units
                                        </li>
                                    ))}
                                </ul>
                            </div>


                            <div>
                                <p className="text-sm text-gray-600">
                                    <strong>Images:</strong>
                                </p>
                                <div className="flex gap-2">
                                    {selectedProduct.images.map((image) => (
                                        <img
                                            key={image.id}
                                            src={image.url}
                                            alt="Product Image"
                                            className="w-24 h-24 object-cover border rounded"
                                        />
                                    ))}
                                </div>
                            </div>


                            <div className="mt-4 p-4 border rounded bg-gray-50">
                                <p className="text-md font-semibold text-gray-800">
                                    AI Suggested Price & Deman forcast:
                                </p>
                                {responseData ? (
                                    <div className=''>
                                    <p className="text-xl font-bold">
                                        Best Price to sell :
                                        <p className="text-xl font-bold text-green-600">₹{demandData}</p>
                                        
                                    </p>
                                    <p>Demand forcast :<p className="text-xl font-bold text-green-600" > {responseData}</p> (moderate)</p>
                                    </div>
                                    
                                ) : (
                                    <p className="text-sm text-gray-500">
                                        Click the button below to fetch the Suggested price.
                                    </p>
                                )}
                            </div>
                        </div>


                        <div className="mt-6 flex justify-end gap-4">
                            <Button onClick={() => getPredictedPrice(selectedProduct)} className="bg-blue-500 text-white px-4 py-2 rounded">
                                Get AI Price
                            </Button>
                            <Button onClick={() => getPredictedDemand(selectedProduct)} className="bg-blue-500 text-white px-4 py-2 rounded">
                                Get AI Forcast
                            </Button>
                            <Button onClick={closeDialog} className="bg-gray-300 px-4 py-2 rounded">
                                Close
                            </Button>
                        </div>
                    </DialogContent>
                </Dialog>
            )}

        </div>
    );
}
