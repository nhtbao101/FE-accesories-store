export interface IProduct {
  id: number;
  slug: string;
  name: string;
  description: string;
  image: string;
  price: number;
  quantity: number;
  discount: number;
  soldCount: number;
  thumbnail: string;
  categoryId: number;
  createdAt: Date;
  updatedAt: Date;
  category: number;
  variant?: any;
}
