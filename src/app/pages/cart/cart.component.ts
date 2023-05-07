import { Component, ElementRef, ViewChild } from '@angular/core';
import { Product } from 'src/app/models';
import { CartService } from 'src/app/_services/cart/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent {
  @ViewChild('selectQuantity') selectQuantityEl: ElementRef | undefined;
  quantityOptions: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  products: Product[] | undefined;
  subtotal: string = '';
  countProduct: number = 0;
  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    const cartInfo = this.cartService.getCartFromLocalStorage();
    if (cartInfo) {
      this.products = cartInfo;
    }
    console.log('cartInfo :>> ', cartInfo);
    if (this.products) {
      let subtotal: number = 0;
      this.products.forEach((product: Product) => {
        const price: number = product.price;
        subtotal += price;
        this.countProduct++;
      });
      this.subtotal = subtotal.toFixed(2);
    }
  }

  updateSubtotal() {
    if (this.products) {
      let newSubtotal: number = 0;
      this.products.forEach((product: Product) => {
        newSubtotal += product.price;
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

    // Update the items in cart after delete
    cartInfo = this.cartService.getCartFromLocalStorage();
    if (cartInfo) {
      this.products = cartInfo;
    }
    this.updateSubtotal();
  }
}
