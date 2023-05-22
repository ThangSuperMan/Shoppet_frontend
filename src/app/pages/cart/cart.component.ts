import { Component, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { OrderItem, Product } from 'src/app/models';
import { CartService } from 'src/app/_services/cart/cart.service';
import { OrderService } from 'src/app/_services/order/order.service';
import { UserAuthService } from 'src/app/_services/user-auth.service';
import { UserService } from 'src/app/_services/user/user.service';
import { User } from '@models';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent {
  @ViewChild('selectQuantity') selectQuantityEl: ElementRef | undefined;
  quantityOptions: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  products: Product[] | undefined = [];
  orderItems: OrderItem[] | undefined = [];
  subtotal: string = '';
  numberOfProducts: number = 9;
  isFading: boolean = false;
  productIdIsFading: string = '-1';
  constructor(
    private userAuthService: UserAuthService,
    private userService: UserService,
    private orderService: OrderService,
    private cartService: CartService,
    private router: Router
  ) {}

  ngOnInit(): void {
    console.log('ngonInit');
    // const cartInfo = this.cartService.getCartFromLocalStorage();
    // if (cartInfo) {
    //   this.products = cartInfo;
    // }
    // console.log('cartInfo :>> ', cartInfo);
    // console.log('length of products :>> ', this.products?.length);
    // this.updateSubtotal();
    // this.updateNumberOfProducts();

    // Get order unpaid if user logged in
    if (this.userAuthService.isLoggedIn()) {
      this.getOrder();
    }
  }

  getQuantityByProductId(productId: string | undefined): string {
    console.log('getQuantityByProductId just triggred!');
    const orderItem = this.orderItems?.find(
      (orderItem: OrderItem) => orderItem.productId == productId
    );
    if (orderItem) {
      return orderItem.quantity.toString();
    } else {
      return '1';
    }
  }

  getOrder(): void {
    console.log('CartComponent getOrder method is running');
    let user: User | undefined;
    this.userService.getUserProfile().subscribe({
      next: (response: { user: User }) => {
        console.log('response :>> ', response);
        user = response.user;
        if (user.id) {
          this.orderService.getOrder(user.id).subscribe({
            next: (response: {
              products: Product[];
              orderItems: OrderItem[];
            }) => {
              console.log('response :>> ', response);
              this.products = response.products;
              this.orderItems = response.orderItems;
              this.getQuantityByProductId('1');
              console.log('orderItems :>> ', this.orderItems);
              this.updateSubtotal();
              this.updateNumberOfProducts();
            },
            error: (error: any) => {
              console.log('error :>> ', error);
            },
          });
        }
      },
      error: (error: any) => {
        console.log('error :>> ', error);
      },
    });
  }

  handlePayment(): void {
    console.log('handlePayment');
    this.router.navigate(['/payment']);
  }

  handleUpdateProductQuantity(
    productId: string,
    selectedQuantityValue: string
  ): void {
    console.log('handleSelectQuantity');
    if (this.products && this.userAuthService.isLoggedIn()) {
      const indexWillBeRemove = this.products?.findIndex(
        (product: Product) => product.id === productId
      );
      const productWillBeUpdate = this.products.find(
        (product: Product) => product.id === productId
      );
      const newQuantity = selectedQuantityValue;
      if (productWillBeUpdate) {
        productWillBeUpdate.quantity = parseInt(newQuantity);
      }

      console.log('productWillBeUpdate :>> ', productWillBeUpdate);
      if (productWillBeUpdate) {
        this.products.splice(indexWillBeRemove, 1, productWillBeUpdate);
        this.cartService.setCartAfterUpdateProduct(this.products);
        this.updateNumberOfProducts();
      }
    }

    setTimeout(() => {
      this.isFading = true;
      if (this.productIdIsFading) {
        this.productIdIsFading = productId;
      }
      setTimeout(() => {
        this.isFading = false;
      }, 1000);
    }, 0);

    this.updateSubtotal();
  }

  updateNumberOfProducts() {
    this.numberOfProducts = 0;
    if (this.products) {
      this.numberOfProducts = this.products.length;
    }
  }

  updateSubtotal(): void {
    console.log('updateSubtotal');
    console.log('this.products :>> ', this.products);
    if (this.products) {
      let newSubtotal: number = 0;
      this.products.forEach((product: Product) => {
        const orderItem = this.orderItems?.find(
          (orderItem: OrderItem) => orderItem.productId === product.id
        );
        if (orderItem) {
          newSubtotal += product.price * orderItem.quantity;
        }
      });

      this.subtotal = newSubtotal.toFixed(2);
    }
  }

  handleDeleteProductInCart(productId: string | undefined): void {
    console.log('handleDeleteProductInCart');
    let products: Product[] | null | undefined = [];
    let cartInfo = this.cartService.getCartFromLocalStorage();
    products = cartInfo;
    products = cartInfo?.filter((product: Product) => product.id !== productId);
    this.cartService.setCartAfterDeleteProduct(products);

    if (this.userAuthService.isLoggedIn() && productId) {
      this.orderService.deleteOrderItem(productId);
    }

    // Update the items in cart after delete
    cartInfo = this.cartService.getCartFromLocalStorage();
    if (cartInfo) {
      this.products = cartInfo;
    }
    this.updateSubtotal();
    this.updateNumberOfProducts();
    location.reload();
  }
}
