import { computed, Injectable, signal } from '@angular/core';
import { Product } from '../models/product.model';
import { ProductService } from './product.service';
import { CategoryService } from './category.service';
import { Category } from '../models/category.model';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private products = signal<Product[]>([]);

  private categories = signal<Category[]>([]);

  private cart = signal<Product[]>([]);

  private totalPrice = computed(() =>
    this.cart().reduce((acc, product) => acc + product.price, 0)
  );

  constructor(
    private readonly productService: ProductService,
    private readonly categoryService: CategoryService
  ) {
    this.loadProducts();
    this.loadCategories();
  }

  public getCart(): Product[] {
    return this.cart();
  }

  public setCart(value: Product[]) {
    this.cart.set(value);
  }

  public getProducts(): Product[] {
    return this.products();
  }

  public getTotalPrice(): number {
    return this.totalPrice();
  }

  public getCategories(): Category[] {
    return this.categories();
  }

  public addToCart(event: Product) {
    this.cart.update((cart) => [...cart, event]);
  }

  public removeProductOfCart(event: Product) {
    this.cart.update((cart) =>
      cart.filter((product) => product.id !== event.id)
    );
  }

  public loadProducts(categoryId?: string) {
    this.productService.getProducts(categoryId).subscribe({
      next: (products) => this.products.set(products),
      error: (error) => console.error(error),
    });
  }

  public loadCategories() {
    this.categoryService.getCategories().subscribe({
      next: (categories) => this.categories.set(categories),
      error: (error) => console.error(error),
    });
  }
}
