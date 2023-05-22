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
    return this.httpClient.get<any>(url);
  }

  public saveOrder(order: Order): Observable<any> {
    console.log('OrderService saveOrder method is running...');
    const url = `${env.pathApi}/orders/save`;
    return this.httpClient.post<any>(url, order);
    // return this.httpClient.post<any>(url, order).pipe(
    //   catchError((error: HttpErrorResponse) => {
    //     console.log('error infor :>> ', error);
    //     if (error.status == 409) {
    //       console.log('banana');
    //       this.logger.warning('This product exists before in your database!');
    //       this.toastService.warning(
    //         'This product exists in your cart, please choose another one, thank you.'
    //       );
    //     }
    //     return throwError(() => error);
    //   })
    // );
  }

  public deleteOrderItem(productId: string): Observable<any> {
    console.log('OrderService deleteOrderItem method is running');
    const url = `${env.pathApi}/orders/delete`;
    return this.httpClient.post<any>(url, productId);
  }
}
