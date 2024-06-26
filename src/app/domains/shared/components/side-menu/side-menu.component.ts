import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Product } from '../../models/product.model';
import { CartService } from './../../services/cart.service';

@Component({
  selector: 'shared-side-menu',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './side-menu.component.html',
})
export class SideMenuComponent {
  @Input({ required: true }) public hideSideMenu = true;

  @Output() public onSideMenu = new EventEmitter();

  constructor(private cartService: CartService) {}

  public get cart(): Product[] {
    return this.cartService.getCart();
  }

  public get total(): number {
    return this.cartService.getTotalPrice();
  }

  public toggleSideMenu(): void {
    this.onSideMenu.emit(!this.hideSideMenu);
  }

  public removeProductOfCart(product: Product): void {
    this.cartService.removeProductOfCart(product);
  }
}
