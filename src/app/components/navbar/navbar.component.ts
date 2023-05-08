import { EventEmitter } from '@angular/core';
import { Component, Output } from '@angular/core';
import { Product } from 'src/app/models';
import { CartService } from 'src/app/_services/cart/cart.service';

interface SideNavToggleProps {
  isShowSideNav: boolean;
}

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
  @Output() onSideNavToggle: EventEmitter<SideNavToggleProps> =
    new EventEmitter<any>();
  countProductsInCart: number = 0;
  isShowSideNav: boolean = false;

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    const products: Product[] | null =
      this.cartService.getCartFromLocalStorage();
    if (products) {
      products.forEach(() => {
        this.countProductsInCart++;
      });

      console.log('products in cart :>> ', products);
    }

    console.log('this.countProductsInCart :>> ', this.countProductsInCart);
  }

  ngOnChanges(): void {
    console.log('ngOnChanges in navbar compo');
  }

  toggleSideNav(): void {
    this.isShowSideNav = !this.isShowSideNav;
    this.onSideNavToggle.emit({ isShowSideNav: this.isShowSideNav });
  }

  handleClickOverlay(): void {
    const overlay = document.querySelector('.overlay');
    if (this.isShowSideNav) {
      overlay?.classList.remove('active');
    } else {
      overlay?.classList.remove('active');
    }
    this.isShowSideNav = !this.isShowSideNav;
    this.onSideNavToggle.emit({ isShowSideNav: this.isShowSideNav });
  }
}
