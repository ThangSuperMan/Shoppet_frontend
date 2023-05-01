import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import env from '@env';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  requestHeader = new HttpHeaders({ 'No-Auth': 'True' });

  constructor(private httpClient: HttpClient) {}

  public getAllProducts(): Observable<any> {
    console.log('ProductService getAllProducts method is running...');
    return this.httpClient.get<any>(`${env.pathApi}/products`, {
      headers: this.requestHeader,
    });
  }

  public getAllProuctsBasedOnPageNumber(pageNumber: number): Observable<any> {
    console.log(
      'ProductService getAllProuctsBasedOnPageNumber method is running...'
    );
    return this.httpClient.get<any>(
      `${env.pathApi}/products?pageNumber=${pageNumber}`,
      {
        headers: this.requestHeader,
      }
    );
  }

  public getProduct(id: number): Observable<any> {
    console.log('ProductService getProduct method is running...');
    return this.httpClient.get<any>(`${env.pathApi}/products/${id}`, {
      headers: this.requestHeader,
    });
  }
}
