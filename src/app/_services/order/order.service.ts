import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import env from '@env';
import { Order, OrderItem } from '@models';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  requestHeader = new HttpHeaders({ 'No-Auth': 'True' });

  constructor(private httpClient: HttpClient) {}

  public getOrder(userId: string): Observable<any> {
    console.log('OrderService getOrder method is running');
    const url = `${env.pathApi}/orders/${userId}`;
    return this.httpClient.get<any>(url);
  }

  public getOrderItemsByAccessToken(): Observable<any> {
    console.log('OrderService getOrderItemsByAccessToken method is running');
    const url = `${env.pathApi}/orders/order_items/authenticated`;
    // username auto inject in the request when send request to the server
    return this.httpClient.get<any>(url);
  }

  public getOrderItemsByOrderId(orderId: string | undefined): Observable<any> {
    console.log('OrderService getOrderItems method is running');
    const url = `${env.pathApi}/orders/order_items/${orderId}`;
    return this.httpClient.get<any>(url);
  }

  public saveOrder(order: Order): Observable<any> {
    console.log('OrderService saveOrder method is running...');
    const url = `${env.pathApi}/orders/save`;
    return this.httpClient.post<any>(url, order);
  }

  public updateOrder(order: OrderItem): Observable<any> {
    console.log('OrderService updateOrder is running');
    const url = `${env.pathApi}/orders/update`;
    return this.httpClient.put<any>(url, order);
  }

  public deleteOrderItem(orderItem: OrderItem): Observable<any> {
    console.log('OrderService deleteOrderItem method is running');
    const url = `${env.pathApi}/orders/delete`;
    return this.httpClient.post<any>(url, orderItem);
  }
}
