import { Injectable } from '@angular/core';
import { Product } from '@models';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  constructor(private toastService: ToastrService) {}

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

    if (products) {
      products.push(product);
    }
    const producetJson = JSON.stringify(products);
    localStorage.setItem('cartInfo', producetJson);
    this.toastService.success('Added to cart');
  }

  public getCartFromLocalStorage(): Product[] | null {
    console.log('getCart');
    // @ts-ignore
    return JSON.parse(localStorage.getItem('cartInfo'));
  }
}
