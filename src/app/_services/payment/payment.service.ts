import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Payment } from '@models';
import env from '@env';

@Injectable({
  providedIn: 'root',
})
export class PaymentService {
  constructor(private httpClient: HttpClient) {}

  public paymentWithPaypal(payment: Payment): Observable<any> {
    console.log('PaymentService paymentWithPaypal method is running');
    const url = `${env.pathApi}/payment`;
    return this.httpClient.post(url, payment);
  }
}
