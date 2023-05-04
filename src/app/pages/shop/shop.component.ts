import { Component } from '@angular/core';
import { ProductService } from 'src/app/_services/product/product.service';
import { Product } from '@models';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NgxFancyLoggerService } from 'ngx-fancy-logger';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss'],
})
export class ShopComponnet {
  products: Product[] = [];
  pageNumber: number = 1;
  totalPages: number | undefined;
  isLoading: boolean = true;

  constructor(
    private logger: NgxFancyLoggerService,
    private toastService: ToastrService,
    private productService: ProductService,
    private route: ActivatedRoute
  ) {}

  onLoadingChanged(isLoading: boolean) {
    this.isLoading = isLoading;
    this.getProductsBasedOnPageNumber();
  }

  ngOnInit() {
    console.log('ngOnInit of ShopComponnet');
    // Event url listenner
    this.route.queryParams.subscribe((params) => {
      const pageNumber: number = params['pageNumber'];
      if (pageNumber >= 1) {
        this.pageNumber = pageNumber;
        this.getProductsBasedOnPageNumber();
      }
    });
    this.getProductsBasedOnPageNumber();
  }

  getProductsBasedOnPageNumber(): void {
    this.logger.info(
      'ShopComponnet getProductsBasedOnPageNumber method is running...'
    );
    this.productService
      .getAllProuctsBasedOnPageNumber(this.pageNumber)
      .subscribe({
        next: (response: any) => {
          this.logger.info('Response: ', response);
          if (response.errorMessage) {
            this.logger.warning(response.errorMessage);
            this.toastService.warning(response.errorMessage);
          } else {
            this.totalPages = response.totalPages;
            this.products = response.products;
            this.isLoading = false;
          }
        },
        error: (error: any) => {
          this.logger.error(`Error :>> `, error);
        },
      });
  }
}
