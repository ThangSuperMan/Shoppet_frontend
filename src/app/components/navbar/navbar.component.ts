import { EventEmitter } from '@angular/core';
import { Component, Output } from '@angular/core';
import { Product } from 'src/app/models';
import { CartService } from 'src/app/_services/cart/cart.service';
import { OrderService } from 'src/app/_services/order/order.service';
import { UserAuthService } from 'src/app/_services/user-auth.service';

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

  constructor(
    private orderService: OrderService,
    private cartService: CartService,
    private userAuthSerivce: UserAuthService
  ) {}

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

    if (this.userAuthSerivce.isLoggedIn()) {
      // get number of products in the cart
    }
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
