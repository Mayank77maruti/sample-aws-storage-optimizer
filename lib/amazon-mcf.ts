import { z } from 'zod';

export const OrderSchema = z.object({
  id: z.string(),
  customer: z.object({
    name: z.string(),
    email: z.string().email(),
    address: z.string(),
  }),
  items: z.array(z.object({
    sku: z.string(),
    quantity: z.number(),
    price: z.number(),
  })),
  status: z.enum(['pending', 'processing', 'fulfilled', 'cancelled']),
  total: z.number(),
  createdAt: z.string(),
});

export type Order = z.infer<typeof OrderSchema>;

export const InventorySchema = z.object({
  id: z.string(),
  name: z.string(),
  sku: z.string(),
  quantity: z.number(),
  price: z.number(),
  description: z.string().optional(),
  url:z.string()
});

export type Inventory = z.infer<typeof InventorySchema>;

// Mock data for development
export const mockOrders: Order[] = [
  {
    id: 'ORD-001',
    customer: {
      name: 'John Doe',
      email: 'john@example.com',
      address: '123 Main St, City, Country',
    },
    items: [
      { sku: 'TS-001', quantity: 2, price: 29.99 },
    ],
    status: 'processing',
    total: 59.98,
    createdAt: '2024-03-20',
  },
  {
    id: 'ORD-002',
    customer: {
      name: 'Jane Smith',
      email: 'jane@example.com',
      address: '456 Oak St, City, Country',
    },
    items: [
      { sku: 'DJ-001', quantity: 1, price: 89.99 },
    ],
    status: 'fulfilled',
    total: 89.99,
    createdAt: '2024-03-19',
  },
];

export const mockInventory: Inventory[] = [
  {
    id: 'PRD-001',
    name: 'Bulk Cotton T-Shirts - Pack of 50',
    sku: 'TS-001-BULK',
    quantity: 300,
    price: 500.00,
    description: 'High-quality cotton t-shirts in bulk, assorted colors, ideal for resale.',
    url:'https://cdn.dummyjson.com/products/images/mens-shirts/Blue%20&%20Black%20Check%20Shirt/1.png'
  },
  {
    id: 'PRD-002',
    name: 'Slim-Fit Jeans - Wholesale Pack of 20',
    sku: 'DJ-001-WHS',
    quantity: 100,
    price: 1200.00,
    description: 'Designer slim-fit denim jeans in wholesale pack, various sizes.',
    url:'/sambhav/jeans.jpg'
  },
  {
    id: 'PRD-003',
    name: 'Noise-Canceling Headphones - Bulk of 10',
    sku: 'HP-001-BULK',
    quantity: 40,
    price: 1500.00,
    description: 'Wireless noise-canceling headphones, bulk order suitable for electronics retailers.',
    url:'/sambhav/noisehead.jpg'
  },
  {
    id: 'PRD-004',
    name: 'Smart Fitness Watches - Box of 25',
    sku: 'SW-001-WHS',
    quantity: 0,
    price: 3000.00,
    description: 'Advanced fitness trackers with heart rate monitoring, wholesale pack for gyms and fitness centers.',
    url:'/sambhav/watch.jpg'
  },
  {
    id: 'PRD-005',
    name: 'Stainless Steel Water Bottles - Pack of 100',
    sku: 'WB-001-BULK',
    quantity: 500,
    price: 800.00,
    description: 'Eco-friendly stainless steel water bottles in bulk, various colors.',
    url:'/sambhav/bottel.jpg'
  },
  {
    id: 'PRD-006',
    name: 'Organic Cotton Tote Bags - Pack of 200',
    sku: 'TB-001-WHS',
    quantity: 250,
    price: 600.00,
    description: 'Durable and eco-friendly tote bags in bulk for retailers.',
    url:'/sambhav/totebags.jpg'
  },
  {
    id: 'PRD-007',
    name: 'Reusable Face Masks - Pack of 500',
    sku: 'FM-001-BULK',
    quantity: 150,
    price: 1000.00,
    description: 'Bulk pack of washable and reusable face masks in assorted colors.',
    url:'/sambhav/mask.jpg'
  },
  {
    id: 'PRD-008',
    name: 'LED Desk Lamps - Box of 50',
    sku: 'DL-001-WHS',
    quantity: 60,
    price: 750.00,
    description: 'Energy-efficient LED desk lamps, ideal for office and home setups.',
    url:'/sambhav/leddesk.jpg'
  },
  {
    id: 'PRD-009',
    name: 'Portable Power Banks - Bulk of 100',
    sku: 'PB-001-BULK',
    quantity: 200,
    price: 2000.00,
    description: 'High-capacity power banks, perfect for tech and electronics retailers.',
    url:'/sambhav/power.jpg'
  },
  {
    id: 'PRD-010',
    name: 'Bluetooth Speakers - Pack of 30',
    sku: 'BS-001-WHS',
    quantity: 80,
    price: 1200.00,
    description: 'Compact and portable Bluetooth speakers, ideal for gadget shops.',
    url:'/sambhav/blutooth.jpg'
  },
  {
    id: 'PRD-011',
    name: 'Wireless Keyboards - Box of 40',
    sku: 'WK-001-BULK',
    quantity: 150,
    price: 1600.00,
    description: 'Ergonomic wireless keyboards, bulk pack for office supply stores.',
    url:'/sambhav/key.jpg'
  },
  {
    id: 'PRD-012',
    name: 'Laptop Cooling Pads - Pack of 75',
    sku: 'CP-001-WHS',
    quantity: 90,
    price: 900.00,
    description: 'Durable laptop cooling pads, bulk order suitable for tech retailers.',
    url:'/sambhav/pad.jpg'
  },
  {
    id: 'PRD-013',
    name: 'Eco-Friendly Notebooks - Pack of 500',
    sku: 'NB-001-BULK',
    quantity: 500,
    price: 700.00,
    description: 'Recycled paper notebooks, ideal for schools and office supplies.',
    url:'/sambhav/ecobook.jpg'
  },
  {
    id: 'PRD-014',
    name: 'Stylus Pens - Box of 200',
    sku: 'SP-001-WHS',
    quantity: 300,
    price: 500.00,
    description: 'Touchscreen stylus pens in bulk, perfect for tablet and phone users.',
    url:'/sambhav/pens.png'
  },
  {
    id: 'PRD-015',
    name: 'Portable USB Drives - Bulk of 100',
    sku: 'USB-001-BULK',
    quantity: 120,
    price: 1500.00,
    description: 'High-capacity USB drives, great for data storage needs.',
    url:'/sambhav/usb.jpg'
  },
  {
    id: 'PRD-016',
    name: 'Wireless Mouse - Pack of 80',
    sku: 'WM-001-WHS',
    quantity: 180,
    price: 1100.00,
    description: 'Compact wireless mouse for office and personal use, ideal for bulk purchase.',
    url:'/sambhav/mouse.jpg'
  },
  {
    id: 'PRD-017',
    name: 'Anti-Glare Screen Protectors - Pack of 1000',
    sku: 'SP-002-BULK',
    quantity: 300,
    price: 2500.00,
    description: 'Anti-glare screen protectors, bulk pack for mobile accessory retailers.',
    url:'/sambhav/anti.webp'
  },
  {
    id: 'PRD-018',
    name: 'Custom Printed Mugs - Box of 200',
    sku: 'MG-001-WHS',
    quantity: 50,
    price: 800.00,
    description: 'Ceramic mugs with custom print, ideal for corporate gifting and retail.',
    url:'/sambhav/mugs.jpg'
  },
  {
    id: 'PRD-019',
    name: 'Bamboo Toothbrushes - Pack of 500',
    sku: 'BT-001-BULK',
    quantity: 200,
    price: 900.00,
    description: 'Eco-friendly bamboo toothbrushes in bulk, great for health stores.',
    url:'https://bambooindia.com/cdn/shop/files/Pack-2_e3db74d2-7e11-4a5d-b217-4f9f95dcf072_500x.png?v=1695623897'
  },
  {
    id: 'PRD-020',
    name: 'Essential Oil Diffusers - Pack of 60',
    sku: 'OD-001-WHS',
    quantity: 100,
    price: 1800.00,
    description: 'Aromatic essential oil diffusers, bulk pack for wellness and home stores.',
    url:'/sambhav/Essential Oil Diffusers.jpg'
  },
];
