import { Component, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { OrderService } from 'src/app/_services/order/order.service';
import { UserAuthService } from 'src/app/_services/user-auth.service';
import { UserService } from 'src/app/_services/user/user.service';
import { User, Product, OrderItem } from '@models';
import { SharedService } from 'src/app/_services/shared/shared.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss', './cart-split.component.scss'],
})
export class CartComponent {
  @ViewChild('selectQuantity') selectQuantityEl: ElementRef | undefined;
  quantityOptions: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  products: Product[] | undefined = [];
  orderId: string | undefined;
  orderItems: OrderItem[] | undefined = [];
  subtotal: string = '';
  numberOfProducts: number = 9;
  isFading: boolean = false;
  productIdIsFading: string = '-1';
  constructor(
    private userAuthService: UserAuthService,
    private userService: UserService,
    private sharedService: SharedService,
    private orderService: OrderService,
    private router: Router
  ) {}

  addSeoProductTiles(): void {
    console.log('addSeoProductTiles');
    console.log('products :>> ', this.products);
    if (this.products) {
      if (this.products.length > 0) {
        for (let product of this.products) {
          let seoTitle = product.title.replace(/ /g, '-');
          product.seoTitle = seoTitle;
        }
      }
    }
  }

  ngOnInit(): void {
    console.log('ngonInit');
    // Local storage way
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

  getCurrentQuantityByProductId(productId: string | undefined): string {
    const orderItem = this.orderItems?.find(
      (orderItem: OrderItem) => orderItem.productId == productId
    );
    if (orderItem && orderItem.quantity) {
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
              if (this.products) {
                this.addSeoProductTiles();
              }
              this.orderItems = response.orderItems;
              this.getCurrentQuantityByProductId('1');
              console.log('orderItems :>> ', this.orderItems);
              this.getSubtotalOfProducts();
              this.getNumberOfProducts();
              this.numberOfProducts = this.getTotalItemsInCart();
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
    console.log('handleUpdateProductQuantity');
    if (this.products && this.userAuthService.isLoggedIn()) {
      const productWillBeUpdate = this.products.find(
        (product: Product) => product.id === productId
      );
      const newQuantity = selectedQuantityValue;
      if (productWillBeUpdate) {
        productWillBeUpdate.quantity = parseInt(newQuantity);
      }

      // Order id, product id, quantity
      if (productWillBeUpdate && this.orderItems) {
        this.orderId = this.orderItems[0].orderId;
        console.log('orderId :>> ', this.orderId);
        const orderItem: OrderItem = {
          orderId: this.orderId,
          productId: productWillBeUpdate.id,
          quantity: productWillBeUpdate.quantity,
        };
        this.orderService.updateOrder(orderItem).subscribe({
          next: (response: any) => {
            console.log('response :>> ', response);
            // Get the updated orderitems
            this.orderService.getOrderItemsByOrderId(this.orderId).subscribe({
              next: (response: any) => {
                console.log('response :>> ', response);
                console.log('response.orderItems :>> ', response.orderItems);
                this.orderItems = response.orderItems;
                this.getSubtotalOfProducts();
                this.getNumberOfProducts();
                this.numberOfProducts = this.getTotalItemsInCart();
                this.sharedService.triggerReloadNavbarComponent();
              },
              error: (error: any) => {
                console.log('error :>> ', error);
              },
            });
            // api updated -> need to query to get updated api this.getOrder()
            // this.getOrder();
          },
          error: (error: any) => {
            console.log('error :>> ', error);
          },
        });
      }

      // Local storage way
      // console.log('productWillBeUpdate :>> ', productWillBeUpdate);

      // console.log('productWillBeUpdate :>> ', productWillBeUpdate);
      // if (productWillBeUpdate) {
      //   this.products.splice(indexWillBeRemove, 1, productWillBeUpdate);
      //   this.cartService.setCartAfterUpdateProduct(this.products);
      //   this.updateNumberOfProducts();
      // }
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

    // this.updateSubtotal();
    this.getSubtotalOfProducts();
  }

  getNumberOfProducts() {
    this.numberOfProducts = 0;
    if (this.products) {
      this.numberOfProducts = this.products.length;
    }
  }

  getTotalItemsInCart(): number {
    console.log('CartComponent getTotalItemsInCart is running');
    let count: number = 0;
    if (this.orderItems) {
      this.orderItems.forEach((orderItem: OrderItem) => {
        if (orderItem.quantity) {
          count += orderItem.quantity;
        }
      });
    }
    return count;
  }

  getSubtotalOfProducts(): void {
    console.log('CartComponent getSubtotalOfProducts is running');
    if (this.products) {
      let newSubtotal: number = 0;
      this.products.forEach((product: Product) => {
        const orderItem = this.orderItems?.find(
          (orderItem: OrderItem) => orderItem.productId == product.id
        );

        console.log('orderItem by product id :>> ', orderItem);
        if (orderItem && orderItem.quantity) {
          newSubtotal += product.price * orderItem.quantity;
          console.log('newSubtotal apple :>> ', newSubtotal);
        }
      });
      this.subtotal = newSubtotal.toFixed(2);
      console.log('this.subtotal :>> ', this.subtotal);
    }
  }

  handleDeleteProductInCart(productId: string | undefined): void {
    console.log('handleDeleteProductInCart');

    console.log('products :>> ', this.products);
    console.log('productId :>> ', productId);
    // Get the order item baeed on the productId
    if (this.products && this.orderItems) {
      this.orderId = this.orderItems[0].orderId;
      console.log('this.orderId :>> ', this.orderId);
      if (this.userAuthService.isLoggedIn() && productId && this.orderId) {
        console.log('here');
        const orderItem: OrderItem = {
          orderId: this.orderId,
          productId: productId,
        };
        console.log('orderItem will be delete :>> ', orderItem);
        this.orderService.deleteOrderItem(orderItem).subscribe({
          next: (response: any) => {
            console.log('response :>> ', response);
            this.getOrder();
          },
          error: (error: any) => {
            console.log('error :>> ', error);
          },
        });
      }
    }
    // location.reload();

    // Delete with api

    // Delete with local storage
    // let products: Product[] | null | undefined = [];
    // let cartInfo = this.cartService.getCartFromLocalStorage();
    // products = cartInfo;
    // products = cartInfo?.filter((product: Product) => product.id !== productId);
    // this.cartService.setCartAfterDeleteProduct(products);
    // // Update the items in cart after delete
    // cartInfo = this.cartService.getCartFromLocalStorage();
    // if (cartInfo) {
    //   this.products = cartInfo;
    // }
    // this.updateSubtotal();
    // this.updateNumberOfProducts();
  }
}
