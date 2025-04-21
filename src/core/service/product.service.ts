import { ENDPOINT } from '@/config/endpoint';
import { ApiService } from './api.service';
import { Product } from '../types/product';
import { productQuery } from '../types';

export class ProductService {
  http = new ApiService();

  async getProducts(query?: productQuery) {
    console.log('queryHihi', query);
    return await this.http.get([`${ENDPOINT.product.index}`], {
      ...query
    });
  }

  async getProduct(slug: string) {
    return await this.http.get([`${ENDPOINT.product.index}/${slug}`]);
  }

  async createProduct(body: Product) {
    return await this.http.post([`${ENDPOINT.manage.createProduct}`], body);
  }

  async updateProduct(id: number, body: Product) {
    return await this.http.put(
      [`${ENDPOINT.product.index}/${id}/update`],
      body
    );
  }

  async deleteProduct(id: number) {
    return await this.http.delete([`${ENDPOINT.product.index}/${id}/delete`]);
  }
}
