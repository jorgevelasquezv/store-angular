import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Category } from '../models/category.model';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private url: string = 'https://api.escuelajs.co/api/v1';

  constructor(private readonly http: HttpClient) { }

  public getCategories() {
    return this.http.get<Category[]>(`${this.url}/categories`);
  }

  public getCategoryById(id: number) {
    return this.http.get<Category>(`${this.url}/categories/${id}`);
  }
}
