import { ENDPOINT } from '@/config/endpoint';
import { ApiService } from './api.service';

export class CategoryService {
  http = new ApiService();

  async getCategories() {
    return await this.http.get([`${ENDPOINT.category.index}`]);
  }
}
