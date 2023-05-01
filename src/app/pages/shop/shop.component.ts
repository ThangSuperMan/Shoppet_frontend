import { Component } from '@angular/core';
import { ProductService } from 'src/app/_services/product/product.service';
import { Product } from '@models';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss'],
})
export class ShopComponnet {
  products: Product[] = [];
  constructor(
    private toastService: ToastrService,
    private productService: ProductService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    console.log('ngOnInit of ShopComponnet');
    // Auto trigger when the route change something
    this.route.queryParams.subscribe((params) => {
      const pageNumber: number = params['pageNumber'];
      console.log('pageNumber :>> ', pageNumber);
      if (pageNumber > 1) {
        console.log('pageNumber > 1');
        this.getProductsBasedOnPageNumber(pageNumber);
      }
      // Send request
    });
    this.getProducts();
  }

  getProductsBasedOnPageNumber(pageNumber: number): void {
    console.log(
      'ShopComponnet getProductsBasedOnPageNumber methos is running...'
    );
    this.productService.getAllProuctsBasedOnPageNumber(pageNumber).subscribe({
      next: (response: any) => {
        console.log('Response :>> ', response);
        if (response.errorMessage) {
          console.log('We hae error message');
          this.toastService.error(response.errorMessage);
        } else {
          this.products = response.products;
        }
      },
      error: (error: any) => {
        console.log('Error :>> ', error);
      },
    });
  }

  getProducts(): void {
    console.log('ShopComponent getProducts method is running...');
    this.productService.getAllProducts().subscribe({
      next: (response: any) => {
        console.log('response :>> ', response);
        this.products = response.products;
      },
      error: (error: any) => {
        console.log('Error :>> ', error);
      },
    });
  }
}
