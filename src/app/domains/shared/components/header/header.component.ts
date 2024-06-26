import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { Product } from '../../models/product.model';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { SideMenuComponent } from '../side-menu/side-menu.component';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'shared-header',
  standalone: true,
  imports: [CommonModule, RouterLink, SideMenuComponent, RouterLinkActive],
  templateUrl: './header.component.html',
})
export class HeaderComponent {
  public hideSideMenu = signal<boolean>(true);

  constructor(private cartService: CartService) {}

  public get cart(): Product[] {
    return this.cartService.getCart();
  }

  public toggleSideMenu(): void {
    this.hideSideMenu.set(!this.hideSideMenu());
  }
}
