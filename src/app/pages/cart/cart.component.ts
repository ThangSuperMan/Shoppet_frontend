import { Component, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
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
  countProduct: number = 9;
  isFading: boolean = false;
  productIdIsFading: string = '-1';
  constructor(private cartService: CartService, private router: Router) {}

  ngOnInit(): void {
    console.log('ngonInit');
    const cartInfo = this.cartService.getCartFromLocalStorage();
    if (cartInfo) {
      this.products = cartInfo;
    }
    console.log('cartInfo :>> ', cartInfo);
    this.updateSubtotal();
    this.updateCountProuducts();
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
    if (this.products) {
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
        this.updateCountProuducts();
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

  updateCountProuducts() {
    this.countProduct = 0;
    if (this.products) {
      this.products.forEach((product: Product) => {
        this.countProduct += product.quantity;
      });
    }
  }

  updateSubtotal(): void {
    console.log('updateSubtotal');
    if (this.products) {
      let newSubtotal: number = 0;
      this.products.forEach((product: Product) => {
        newSubtotal += product.price * product.quantity;
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
    this.updateCountProuducts();
    location.reload();
  }
}
