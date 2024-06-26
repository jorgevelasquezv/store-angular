import { CommonModule } from '@angular/common';
import { Component, inject, Input, signal } from '@angular/core';
import { ProductService } from '@/shared/services/product.service';
import { Product } from '@/shared/models/product.model';
import { CartService } from '@/shared/services/cart.service';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './product-detail.component.html',
})
export default class ProductDetailComponent {
  private productServices = inject(ProductService);

  private cartService = inject(CartService);

  public product = signal<Product | null>(null);

  public cover = signal('');

  private router = inject(Router);

  @Input()
  public set id(productId: number) {
    this.productServices
      .getProductById(productId)
      .subscribe({
        next: (product) => {
          this.product.set(product);
          if (product.images.length > 0) {
            this.cover.set(product.images[0]);
          }
        },
        error: () => {
          this.router.navigate(['/not-found']);
        }
      });
  }

  public addToCart() {
    const product = this.product();
    if (product) {
      this.cartService.addToCart(product);
    }
  }

  changeCover(newImg: string) {
    this.cover.set(newImg);
  }
}
