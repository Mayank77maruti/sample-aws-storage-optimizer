import React from "react";

const DeveloperGuide = () => {
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-4xl font-bold mb-6">Vyapaar Plugins Developer Guide</h1>
      <p className="text-lg text-gray-700 mb-4">
        Connect your e-commerce store to Vyapaar using the following API endpoints. These endpoints help you manage orders and products seamlessly.
      </p>

      {/* Orders Section */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-3">1. Orders API</h2>
        <p className="text-gray-600 mb-4">
          Use the Orders API to fetch, create, and update orders associated with a seller.
        </p>
        
        {/* GET Orders */}
        <div className="mb-6">
          <h3 className="text-lg font-medium">GET /api/endpoints/orders</h3>
          <p className="text-gray-500 mb-2">Fetch all orders for a specific seller.</p>
          <pre className="bg-gray-800 text-white p-4 rounded mb-2">
{`GET /api/endpoints/orders?sellerId=06d06d06-8232-481b-959b-a2852300156d`}
          </pre>
          <p className="text-gray-500">**Response:**</p>
          <pre className="bg-gray-800 text-white p-4 rounded">
{`[
  {
    "id": "orderId123",
    "status": "Processing",
    "totalPrice": "199.99",
    "currency": "USD",
    "Customer": { "name": "John Doe", "email": "john@example.com" },
    "orderProducts": [
      {
        "Product": { "title": "T-shirt", "price": "19.99" },
        "quantity": 2
      }
    ],
    "shippingAddress": { "street": "123 Main St", "city": "Metropolis" },
    "billingAddress": { "street": "123 Main St", "city": "Metropolis" }
  }
]`}
          </pre>
        </div>

        {/* POST Orders */}
        <div className="mb-6">
          <h3 className="text-lg font-medium">POST /api/endpoints/orders</h3>
          <p className="text-gray-500 mb-2">Create a new order for a seller.</p>
          <pre className="bg-gray-800 text-white p-4 rounded mb-2">
{`POST /api/endpoints/orders
Content-Type: application/json

{
  "sellerId": "06d06d06-8232-481b-959b-a2852300156d",
  "status": "Processing",
  "totalPrice": 199.99,
  "currency": "USD",
  "customerId": "customerId123"
}`}
          </pre>
          <p className="text-gray-500">**Response:**</p>
          <pre className="bg-gray-800 text-white p-4 rounded">
{`{
  "id": "newOrderId123",
  "status": "Processing",
  "totalPrice": "199.99",
  "currency": "USD",
  "sellerId": "06d06d06-8232-481b-959b-a2852300156d"
}`}
          </pre>
        </div>
      </section>

      {/* Products Section */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-3">2. Products API</h2>
        <p className="text-gray-600 mb-4">
          Use the Products API to fetch, create, and update products associated with a seller.
        </p>

        {/* GET Products */}
        <div className="mb-6">
          <h3 className="text-lg font-medium">GET /api/endpoints/products</h3>
          <p className="text-gray-500 mb-2">Fetch all products for a specific seller.</p>
          <pre className="bg-gray-800 text-white p-4 rounded mb-2">
{`GET /api/endpoints/products?sellerId=06d06d06-8232-481b-959b-a2852300156d`}
          </pre>
          <p className="text-gray-500">**Response:**</p>
          <pre className="bg-gray-800 text-white p-4 rounded">
{`[
  {
    "id": "productId123",
    "title": "T-shirt",
    "productType": "Apparel",
    "tags": ["clothing", "summer"],
    "vendor": "Vyapaar Vendor",
    "images": [{ "url": "https://example.com/image.jpg" }],
    "variants": [
      { "size": "M", "color": "Red", "price": "19.99" },
      { "size": "L", "color": "Blue", "price": "21.99" }
    ]
  }
]`}
          </pre>
        </div>

        {/* POST Products */}
        <div className="mb-6">
          <h3 className="text-lg font-medium">POST /api/endpoints/products</h3>
          <p className="text-gray-500 mb-2">Create a new product for a seller.</p>
          <pre className="bg-gray-800 text-white p-4 rounded mb-2">
{`POST /api/endpoints/products
Content-Type: application/json

{
  "sellerId": "06d06d06-8232-481b-959b-a2852300156d",
  "title": "T-shirt",
  "bodyHtml": "High-quality cotton T-shirt.",
  "productType": "Apparel",
  "tags": ["clothing", "summer"],
  "vendor": "Vyapaar Vendor"
}`}
          </pre>
          <p className="text-gray-500">**Response:**</p>
          <pre className="bg-gray-800 text-white p-4 rounded">
{`{
  "id": "newProductId123",
  "title": "T-shirt",
  "productType": "Apparel",
  "tags": ["clothing", "summer"],
  "vendor": "Vyapaar Vendor",
  "sellerId": "06d06d06-8232-481b-959b-a2852300156d"
}`}
          </pre>
        </div>
      </section>
    </div>
  );
};

export default DeveloperGuide;
