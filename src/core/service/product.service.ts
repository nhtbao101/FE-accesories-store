import { ENDPOINT } from '@/config/endpoint';
import { ApiService } from './api.service';

export class ProductService {
  http = new ApiService();

  async getProducts() {
    return await this.http.get([`${ENDPOINT.product.index}`]);
  }

  async getProduct(slug: string) {
    return await this.http.get([`${ENDPOINT.product.index}/${slug}`]);
  }
}
