import { Component } from '@angular/core';
import { ProductService } from 'src/app/_services/product/product.service';
import { Product } from '@models';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss'],
})
export class ShopComponnet {
  products: Product[] = [];
  constructor(private productService: ProductService) {}

  ngOnInit() {
    this.getProducts();
  }

  getProducts(): void {
    console.log('ShopController renderProducts is running...');
    this.productService.getAllProducts().subscribe({
      next: (response: any) => {
        console.log('response :>> ', response);
        this.products = response;
      },
      error: (error: any) => {
        console.log('Error :>> ', error);
      },
    });
  }
}
