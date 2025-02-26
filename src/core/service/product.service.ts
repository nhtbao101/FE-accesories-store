import { ENDPOINT } from '@/config/endpoint';
import { ApiService } from './api.service';
import { Product } from '../types/product';

export class ProductService {
  http = new ApiService();

  async getProducts() {
    return await this.http.get([`${ENDPOINT.product.index}`]);
  }

  async getProduct(slug: string) {
    return await this.http.get([`${ENDPOINT.product.index}/${slug}`]);
  }

  async createProduct(data: Product) {
    return await this.http.post([`${ENDPOINT.manage.createProduct}`], data);
  }
}
