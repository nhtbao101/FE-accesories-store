import { ProductStatus } from '@/constant/product';

export type Product = {
  name: string;
  description: number;
  price: number;
  quantity: number;
  category: number;
  status: ProductStatus;
  images?: string[];
};
