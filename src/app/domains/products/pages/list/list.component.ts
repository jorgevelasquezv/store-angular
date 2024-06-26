import { CommonModule } from '@angular/common';
import { Component, input, SimpleChanges } from '@angular/core';
import { ProductComponent } from '@/products/components/product/product.component';
import { HeaderComponent } from '@/shared/components/header/header.component';
import { Product } from '@/shared/models/product.model';
import { CartService } from '@/shared/services/cart.service';
import { Category } from '@/shared/models/category.model';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [CommonModule, ProductComponent, HeaderComponent, RouterLink],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css',
})
export default class ListComponent {
  public category_id = input<string>();

  constructor(private cartServices: CartService) {}

  ngOnChanges(changes: SimpleChanges) {
    const changeCategoryId = changes['category_id'];
    if (changeCategoryId && !changeCategoryId.firstChange) {
      const categoryId = this.category_id() ?? '';
      this.cartServices.loadProducts(categoryId);
    }
  }

  public get cart(): Product[] {
    return this.cartServices.getCart();
  }

  public get products(): Product[] {
    return this.cartServices.getProducts();
  }

  public get categories(): Category[] {
    return this.cartServices.getCategories();
  }

  public addToCart(product: Product) {
    this.cartServices.addToCart(product);
  }

  public removeProductOfCart(product: Product) {
    this.cartServices.removeProductOfCart(product);
  }
}
