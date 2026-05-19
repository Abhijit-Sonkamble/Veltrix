import type { LucideIcon } from 'lucide-react';

export interface MenuItem {
  title: string;
  icon: LucideIcon;
  path?: string;
  children?: { title: string; path: string }[];
}

export interface StatCard {
  title: string;
  count: string | number;
  icon: LucideIcon;
  trend: string;
  isPositive: boolean;
  color: string;
}

export interface Product {
  id: string;
  name: string;
  price: number;
  stock: number;
  category: string;
  status: 'Active' | 'Draft';
  image: string;
}

export interface Order {
  id: string;
  user: string;
  product: string;
  date: string;
  amount: number;
  status: 'Pending' | 'Processing' | 'Delivered' | 'Cancelled';
}