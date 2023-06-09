import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '@models';
import env from '@env';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  requestHeader = new HttpHeaders({ 'No-Auth': 'True' });

  constructor(private httpClient: HttpClient) {}

  public getAllProducts(): Observable<any> {
    console.log('ProductService getAllProducts method is running...');
    const url = `${env.pathApi}/products`;
    return this.httpClient.get<any>(url, {
      headers: this.requestHeader,
    });
  }

  public getAllProuctsBasedOnPageNumber(pageNumber: number): Observable<any> {
    console.log(
      'ProductService getAllProuctsBasedOnPageNumber method is running...'
    );
    const url = `${env.pathApi}/products?pageNumber=${pageNumber}`;
    return this.httpClient.get<any>(url, {
      headers: this.requestHeader,
    });
  }

  public getProduct(title: string): Observable<any> {
    console.log('ProductService getProduct method is running...');
    const url = `${env.pathApi}/products/${title}`;
    return this.httpClient.get<any>(url, {
      headers: this.requestHeader,
    });
  }

  addSeoProductTiles(products: Product[]): Product[] {
    console.log('addSeoProductTiles');
    console.log('products :>> ', products);
    if (products) {
      if (products.length > 0) {
        for (let product of products) {
          let seoTitle = product.title.replace(/ /g, '-');
          product.seoTitle = seoTitle;
          console.log('product after add seo title :>> ', product);
        }
      }
    }
    return products;
  }
}
