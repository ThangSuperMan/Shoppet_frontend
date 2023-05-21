import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import env from '@env';
import { Order } from '@models';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  requestHeader = new HttpHeaders({ 'No-Auth': 'True' });

  constructor(private httpClient: HttpClient) {}

  public getOrder(userId: string): Observable<any> {
    console.log('OrderService getOrder method is running');
    const url = `${env.pathApi}/orders/${userId}`;
    console.log('url :>> ', url);
    return this.httpClient.get<any>(url);
  }

  public saveOrder(order: Order): Observable<any> {
    console.log('OrderService saveOrder method is running...');
    console.log('order :>> ', order);
    const url = `${env.pathApi}/orders/save`;
    return this.httpClient.post<any>(url, order);
  }

  public deleteOrderItem(productId: string): Observable<any> {
    console.log('OrderService deleteOrderItem method is running');
    const url = `${env.pathApi}/orders/delete`;
    return this.httpClient.post<any>(url, productId);
  }
}
