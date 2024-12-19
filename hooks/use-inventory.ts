'use client';

import useSWR from 'swr';
import { Inventory } from '@/lib/amazon-mcf';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export function useInventory() {
  const { data, error, isLoading, mutate } = useSWR<Inventory[]>('/api/inventory', fetcher);

  return {
    inventory: data,
    isLoading,
    isError: error,
    mutate,
  };
}