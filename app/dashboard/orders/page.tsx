'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import axios from 'axios';
import { format } from 'date-fns';

type Order = {
  id: string;
  customer: {
    name: string;
  };
  createdAt: string;
  status: string;
  total: number;
};

export default function OrdersPage() {
  const [filter, setFilter] = useState('');
  const [status, setStatus] = useState('all');
  const [orders, setOrders] = useState<Order[]>([]);
  const [filteredOrders, setFilteredOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch orders once on mount
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get('/api/shopify/orders');
        const data = response.data;

        const mappedOrders: Order[] = data.orders.orders.map((order: any) => ({
          id: order.id.toString(),
          customer: {
            name: order.customer?.first_name
              ? `${order.customer.first_name} ${order.customer.last_name}`
              : 'Unknown',
          },
          createdAt: order.created_at,
          status: order.financial_status || 'pending',
          total: parseFloat(order.current_total_price || 0),
        }));

        setOrders(mappedOrders);
      } catch (error) {
        console.error('Error fetching orders:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchOrders();
  }, []);

  // Filter orders whenever filter or status changes
  useEffect(() => {
    const filtered = orders.filter((order) => {
      const matchesFilter =
        order.customer.name.toLowerCase().includes(filter.toLowerCase()) ||
        order.id.includes(filter);
      const matchesStatus = status === 'all' || order.status === status;
      return matchesFilter && matchesStatus;
    });
    setFilteredOrders(filtered);
  }, [filter, status, orders]);

  if (isLoading) {
    return <div className="p-8">Loading orders...</div>;
  }

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold tracking-tight">Orders</h2>
        <Button>Create New Order</Button>
      </div>

      <div className="flex gap-4 mb-6">
        <Input
          placeholder="Search orders..."
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="max-w-sm"
        />
        <Select value={status} onValueChange={setStatus}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="paid">Paid</SelectItem>
            <SelectItem value="fulfilled">Fulfilled</SelectItem>
            <SelectItem value="cancelled">Cancelled</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Order ID</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Total</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredOrders.map((order) => (
              <TableRow key={order.id}>
                <TableCell>{order.id}</TableCell>
                <TableCell>{order.customer.name}</TableCell>
                <TableCell>
                  {format(new Date(order.createdAt), 'MMM d, yyyy')}
                </TableCell>
                <TableCell>
                  <Badge
                    variant={
                      order.status === 'fulfilled'
                        ? 'outline'
                        : order.status === 'cancelled'
                        ? 'destructive'
                        : 'secondary'
                    }
                  >
                    {order.status}
                  </Badge>
                </TableCell>
                <TableCell>₹{order.total.toFixed(2)}</TableCell>
                <TableCell>
                  <Button variant="outline" size="sm">
                    View Details
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
