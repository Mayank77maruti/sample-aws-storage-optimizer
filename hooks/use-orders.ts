'use client';

import useSWR from 'swr';
import { Order } from '@/lib/amazon-mcf';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export function useOrders() {
  const { data, error, isLoading, mutate } = useSWR<Order[]>('/api/orders', fetcher);

  return {
    orders: data,
    isLoading,
    isError: error,
    mutate,
  };
}