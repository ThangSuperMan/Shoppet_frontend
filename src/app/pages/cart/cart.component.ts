import { Component } from '@angular/core';
import { Product } from 'src/app/models';
import { CartService } from 'src/app/_services/cart/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent {
  products: Product[] | undefined;
  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    const cartInfo = this.cartService.getCartFromLocalStorage();
    if (cartInfo) {
      this.products = cartInfo;
    }
    console.log('cartInfo :>> ', cartInfo);
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
  }
}
