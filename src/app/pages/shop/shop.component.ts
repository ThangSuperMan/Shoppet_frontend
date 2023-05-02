import { Component, ElementRef } from '@angular/core';
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
  totalPages: number | undefined;
  isLoading: boolean = true;

  constructor(
    private logger: NgxFancyLoggerService,
    private toastService: ToastrService,
    private productService: ProductService,
    private route: ActivatedRoute,
    private el: ElementRef
  ) {}

  ngAfterViewInit() {
    console.log('ngAfterViewInit');
    const linkElements = this.el.nativeElement.querySelectorAll(
      '.pagination__pages .link'
    );
    console.log('linkElements :>> ', linkElements);
  }

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
    this.logger.info(
      'ShopComponnet getProductsBasedOnPageNumber method is running...'
    );
    this.productService.getAllProuctsBasedOnPageNumber(pageNumber).subscribe({
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

  getProducts(): void {
    console.log('ShopComponent getProducts method is running...');
    this.productService.getAllProducts().subscribe({
      next: (response: any) => {
        this.logger.info('Response: ', response);
        this.products = response.products;
        this.totalPages = response.totalPages;
        this.isLoading = false;
        console.log('totalPages var :>> ', this.totalPages);
      },
      error: (error: any) => {
        console.log('Error :>> ', error);
      },
    });
  }
}
