import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import env from '@env';
import { Order } from '@models';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  requestHeader = new HttpHeaders({ 'No-Auth': 'True' });

  constructor(private httpClient: HttpClient) {}

  // select * from orders where user_id = ?
  // Must be auth this request
  public getOrder(userId: string) {
    const url = `${env.pathApi}/orders?userId=${userId}`;
    return this.httpClient.get(url);
  }

  public saveOrder(order: Order) {
    console.log('OrderService saveOrder method is running...');
    console.log('order :>> ', order);
    const url = `${env.pathApi}/orders/save`;
    return this.httpClient.post<any>(url, {
      headers: this.requestHeader,
    });
  }
}
