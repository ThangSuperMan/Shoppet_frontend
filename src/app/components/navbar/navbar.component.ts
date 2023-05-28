import { EventEmitter } from '@angular/core';
import { Component, Output } from '@angular/core';
import { NgxFancyLoggerService } from 'ngx-fancy-logger';
import { Subscription } from 'rxjs';
import { CartService } from 'src/app/_services/cart/cart.service';
import { UserAuthService } from 'src/app/_services/user-auth.service';

interface SideNavToggleProps {
  isShowSideNav: boolean;
}
import { SharedService } from 'src/app/_services/shared/shared.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
  @Output() onSideNavToggle: EventEmitter<SideNavToggleProps> =
    new EventEmitter<any>();
  numberOfProductsInCart: number = 0;
  isShowSideNav: boolean = false;
  private cartItemAddedSubscription: Subscription | undefined;

  constructor(
    private logger: NgxFancyLoggerService,
    private cartService: CartService,
    private sharedService: SharedService,
    private userAuthSerivce: UserAuthService
  ) {}

  ngOnInit(): void {
    console.log('ngOnInit of NavbarComponent');
    this.loadOnInit();
    this.subscribeToReload();
  }

  loadOnInit(): void {
    // Still not log in for the first load
    if (this.userAuthSerivce.isLoggedIn()) {
      this.getInitNumberOfItemsInCart();
      // Add event listener for subscribe
      this.countItemsInCart();
    } else {
      this.numberOfProductsInCart = 0;
    }
  }

  reloadOnInit(): void {
    this.loadOnInit();
  }

  subscribeToReload(): void {
    console.log('subscribeToReload');
    this.sharedService.reload$.subscribe(() => {
      this.reloadOnInit();
    });
  }

  async getInitNumberOfItemsInCart(): Promise<any> {
    console.log('OrderService getInitNumberOfItemsInCart method is running');
    try {
      const count = await this.cartService.getCartItemCount();
      this.numberOfProductsInCart = count;
    } catch (error) {
      this.logger.error(error);
    }
  }

  async countItemsInCart(): Promise<any> {
    console.log('NavbarComponent countItemsInCart method is running');
    this.cartItemAddedSubscription = this.cartService.cartItemAdded.subscribe(
      async () => {
        console.log('here');
        try {
          const count = await this.cartService.getCartItemCount();
          this.numberOfProductsInCart = count;
        } catch (error) {
          this.logger.error(error);
        }
      }
    );
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
