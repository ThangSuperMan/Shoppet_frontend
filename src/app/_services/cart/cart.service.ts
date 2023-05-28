import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { OrderService } from '../order/order.service';
import { Product, OrderItem, Order } from '@models';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cartItemAdded$: Subject<void> = new Subject<void>();
  public cartItemAdded = this.cartItemAdded$.asObservable();

  constructor(
    private toastService: ToastrService,
    private orderService: OrderService
  ) {}

  private isProductExistsInCart(
    products: Product[] | null,
    id: string
  ): boolean {
    const product: Product | undefined = products?.find(
      (product: Product) => product.id === id
    );
    if (product) return true;
    return false;
  }

  async getCartItemCount(): Promise<number> {
    return new Promise<number>((resolve: any, reject: any) => {
      this.orderService.getOrderItemsByAccessToken().subscribe({
        next: (response: { orderItems: OrderItem[] }) => {
          const { orderItems } = response;
          console.log('response :>> ', orderItems);
          if (orderItems) {
            let count = 0;
            orderItems.forEach((orderItem: OrderItem) => {
              if (orderItem.quantity) {
                count += orderItem.quantity;
              }
            });
            resolve(count);
          }
        },
        error: (error: any) => {
          console.log('error :>> ', error);
          reject(error);
        },
      });
    });
  }

  addToCart(order: Order) {
    console.log('CartService addToCart is running');
    // Get user from auth api
    if (order.userId) {
      console.log('order before send to api :>> ', order);
      this.orderService.saveOrder(order).subscribe({
        next: async (response: any) => {
          console.log('response :>> ', response);
          this.toastService.success('Added product successfully.');
          // Emit a value to notify subscribers that a new item has been added to the cart
          this.cartItemAdded$.next();
        },
        error: (error: any) => {
          console.log('error :>> ', error);
          this.toastService.warning(error);
        },
      });
    }
  }

  public setCartAfterUpdateProduct(products: Product[] | undefined) {
    const producetJson = JSON.stringify(products);
    localStorage.setItem('cartInfo', producetJson);
  }

  public setCartAfterDeleteProduct(products: Product[] | undefined) {
    const producetJson = JSON.stringify(products);
    localStorage.setItem('cartInfo', producetJson);
    this.toastService.success('Deleted product');
  }

  public setCartToLocalStorage(product: Product): void {
    console.log('setCart');
    let products: Product[] | null = [];
    products = this.getCartFromLocalStorage();
    if (this.isProductExistsInCart(products, product.id)) {
      this.toastService.error('Sorry, this item was in the cart already!');
      return;
    }

    console.log(
      ' this.isProductExistsInCart(products, product.id):>> ',
      this.isProductExistsInCart(products, product.id)
    );

    if (products) {
      products.push(product);
    } else {
      products = [product];
    }

    console.log('products :>> ', products);
    const producetJson = JSON.stringify(products);
    localStorage.setItem('cartInfo', producetJson);
    this.toastService.success('Added to cart');
  }

  public getCartFromLocalStorage(): Product[] | null {
    console.log('getCart');
    // @ts-ignore
    return JSON.parse(localStorage.getItem('cartInfo'));
  }

  public clearnCartFromLocalStorage(): void {
    localStorage.removeItem('cartInfo');
  }
}
