import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private readonly url = 'https://api.escuelajs.co/api/v1';

  constructor(private readonly http: HttpClient) {}

  public getProducts(categoryId?: string) {
    return this.http.get<Product[]>(
      `${this.url}/products${categoryId ? '?categoryId=' + categoryId : ''}`
    );
  }

  public getProductById(id: number) {
    return this.http.get<Product>(`${this.url}/products/${id}`);
  }
}
